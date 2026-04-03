import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  passwordHash: text("password_hash").notNull(),

  fullName: varchar("full_name", { length: 100 }),

  phone: varchar("phone", { length: 20 }),

  address: text("address"),

  role: varchar("role", { length: 20 }).default("customer"),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});

/* =========================
   PIZZAS TABLE
========================= */
export const pizzas = pgTable("pizzas", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  description: text("description"),

  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),

  category: varchar("category", { length: 50 }),

  imageUrl: text("image_url"),

  isAvailable: boolean("is_available").default(true),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

/* =========================
   CART ITEMS TABLE
========================= */
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),

  pizzaId: integer("pizza_id").references(() => pizzas.id, {
    onDelete: "cascade",
  }),

  size: varchar("size", { length: 20 }).notNull(),

  quantity: integer("quantity").default(1),

  extraToppings: jsonb("extra_toppings"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

/* =========================
   ORDERS TABLE
========================= */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id, {
    onDelete: "set null",
  }),

  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),

  deliveryAddress: text("delivery_address").notNull(),

  status: varchar("status", { length: 50 }).default("Pending"),

  paymentStatus: varchar("payment_status", { length: 50 }).default("Unpaid"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

/* =========================
   ORDER ITEMS TABLE
========================= */
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),

  orderId: integer("order_id").references(() => orders.id, {
    onDelete: "cascade",
  }),

  pizzaId: integer("pizza_id").references(() => pizzas.id, {
    onDelete: "set null",
  }),

  quantity: integer("quantity").notNull(),

  priceAtPurchase: decimal("price_at_purchase", {
    precision: 10,
    scale: 2,
  }).notNull(),

  size: varchar("size", { length: 20 }).notNull(),

  extraToppings: jsonb("extra_toppings"),
});
