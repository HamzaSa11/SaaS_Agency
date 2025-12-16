import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import ws from "ws";
import { 
  users, 
  loginEvents, 
  purchases,
  type User, 
  type InsertUser,
  type LoginEvent,
  type InsertLoginEvent,
  type Purchase,
  type InsertPurchase
} from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLoginEvent(event: InsertLoginEvent): Promise<LoginEvent>;
  getLoginEventsByUser(userId: number): Promise<LoginEvent[]>;
  getAllLoginEvents(): Promise<LoginEvent[]>;
  
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchasesByUser(userId: number): Promise<Purchase[]>;
  getAllPurchases(): Promise<Purchase[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createLoginEvent(event: InsertLoginEvent): Promise<LoginEvent> {
    const result = await db.insert(loginEvents).values(event).returning();
    return result[0];
  }

  async getLoginEventsByUser(userId: number): Promise<LoginEvent[]> {
    return await db.select().from(loginEvents).where(eq(loginEvents.userId, userId));
  }

  async getAllLoginEvents(): Promise<LoginEvent[]> {
    return await db.select().from(loginEvents);
  }

  async createPurchase(purchase: InsertPurchase): Promise<Purchase> {
    const result = await db.insert(purchases).values(purchase).returning();
    return result[0];
  }

  async getPurchasesByUser(userId: number): Promise<Purchase[]> {
    return await db.select().from(purchases).where(eq(purchases.userId, userId));
  }

  async getAllPurchases(): Promise<Purchase[]> {
    return await db.select().from(purchases);
  }
}

export const storage = new DatabaseStorage();
