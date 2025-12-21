import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const loginEvents = pgTable("login_events", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  username: text("username").notNull(),
  loginTime: timestamp("login_time").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  username: text("username").notNull(),
  projectName: text("project_name").notNull(),
  projectId: text("project_id").notNull(),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  purchaseTime: timestamp("purchase_time").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  username: text("username").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clicks = pgTable("clicks", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLoginEventSchema = createInsertSchema(loginEvents).pick({
  userId: true,
  username: true,
  ipAddress: true,
  userAgent: true,
});

export const insertPurchaseSchema = createInsertSchema(purchases).pick({
  userId: true,
  username: true,
  projectName: true,
  projectId: true,
  amount: true,
  currency: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  userId: true,
  username: true,
  rating: true,
  comment: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLoginEvent = z.infer<typeof insertLoginEventSchema>;
export type LoginEvent = typeof loginEvents.$inferSelect;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type Purchase = typeof purchases.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
