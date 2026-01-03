import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { insertUserSchema, insertPurchaseSchema, insertReviewSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const parsed = insertUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }

      const { username, password } = parsed.data;
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ username, password: hashedPassword });
      
      await storage.createLoginEvent({
        userId: user.id,
        username: user.username,
        ipAddress: req.ip || req.socket.remoteAddress || null,
        userAgent: req.get("User-Agent") || null,
      });

      return res.status(201).json({ 
        message: "User registered successfully",
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      await storage.createLoginEvent({
        userId: user.id,
        username: user.username,
        ipAddress: req.ip || req.socket.remoteAddress || null,
        userAgent: req.get("User-Agent") || null,
      });

      return res.json({ 
        message: "Login successful",
        user: { id: user.id, username: user.username }
      });
    } catch (error: any) {
      console.error("Login error details:", {
        message: error.message,
        code: error.code,
        stack: error.stack,
        detail: error.detail
      });
      return res.status(500).json({ error: "Internal server error", message: error.message });
    }
  });

  // Purchase routes
  app.post("/api/purchases", async (req: Request, res: Response) => {
    try {
      const parsed = insertPurchaseSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }

      const purchase = await storage.createPurchase(parsed.data);
      return res.status(201).json({ message: "Purchase recorded", purchase });
    } catch (error) {
      console.error("Purchase error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/purchases/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const purchases = await storage.getPurchasesByUser(userId);
      return res.json(purchases);
    } catch (error) {
      console.error("Get purchases error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Login events routes (for admin purposes)
  app.get("/api/login-events", async (_req: Request, res: Response) => {
    try {
      const events = await storage.getAllLoginEvents();
      return res.json(events);
    } catch (error) {
      console.error("Get login events error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/purchases", async (_req: Request, res: Response) => {
    try {
      const purchases = await storage.getAllPurchases();
      return res.json(purchases);
    } catch (error) {
      console.error("Get all purchases error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Review routes
  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      const parsed = insertReviewSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }

      const review = await storage.createReview(parsed.data);
      return res.status(201).json({ message: "Review recorded", review });
    } catch (error) {
      console.error("Review error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/reviews", async (_req: Request, res: Response) => {
    try {
      const reviews = await storage.getAllReviews();
      return res.json(reviews);
    } catch (error) {
      console.error("Get reviews error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Click tracking routes
  app.post("/api/clicks", async (_req: Request, res: Response) => {
    try {
      await storage.createClick();
      return res.status(201).json({ message: "Click recorded" });
    } catch (error) {
      console.error("Click error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/clicks/count", async (_req: Request, res: Response) => {
    try {
      const count = await storage.getClickCount();
      return res.json({ count });
    } catch (error) {
      console.error("Get click count error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
