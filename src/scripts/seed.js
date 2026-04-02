const { Pool } = require("pg");
const path = require("path");
// Load environment variables from .env.local
require("dotenv").config({ path: path.resolve(__dirname, "../../.env.local") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const samplePizzas = [
  {
    name: "Margherita Classic",
    description: "Fresh tomato sauce, mozzarella, and organic basil.",
    price: 12.99,
    category: "Veg",
  },
  {
    name: "Pepperoni Feast",
    description: "Double pepperoni and extra mozzarella on sourdough crust.",
    price: 15.5,
    category: "Meat",
  },
  {
    name: "Veggie Supreme",
    description: "Bell peppers, onions, mushrooms, olives, and corn.",
    price: 14.0,
    category: "Veg",
  },
  {
    name: "Spicy Diavola",
    description: "Hot salami, jalapeños, and spicy tomato base.",
    price: 16.25,
    category: "Spicy",
  },
  {
    name: "BBQ Chicken Roast",
    description: "Grilled chicken, smoky BBQ sauce, and red onions.",
    price: 17.0,
    category: "Meat",
  },
  {
    name: "Four Cheese Bliss",
    description: "Mozzarella, Parmesan, Gorgonzola, and Fontina.",
    price: 15.0,
    category: "Veg",
  },
];

async function runSeed() {
  try {
    console.log("🗑️  Clearing existing pizza data...");
    // TRUNCATE removes all rows and resets the ID counter
    await pool.query("TRUNCATE TABLE pizzas RESTART IDENTITY CASCADE");

    console.log("🌱 Inserting fresh sample data...");
    for (const pizza of samplePizzas) {
      await pool.query(
        "INSERT INTO pizzas (name, description, base_price, category) VALUES ($1, $2, $3, $4)",
        [pizza.name, pizza.description, pizza.price, pizza.category],
      );
    }

    console.log("✅ Success! Database is now fresh.");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await pool.end();
  }
}

runSeed();
