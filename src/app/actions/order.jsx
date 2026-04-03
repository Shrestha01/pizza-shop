"use server"; // This tells Next.js to run this ONLY on the server
import { query } from "@/lib/db_temp";

export async function createOrder(orderData) {
  const { customer_name, phone, address, items, total } = orderData;
  console.log(orderData);

  try {
    // 1. Insert the main order into the 'orders' table
    // We use RETURNING id to get the ID of the order we just made
    const orderResult = await query(
      `INSERT INTO orders_temp (customer_name, phone, delivery_address, total_amount, status) 
       VALUES ($1, $2, $3, $4, 'Pending') 
       RETURNING id`,
      [customer_name, phone, address, total],
    );

    const orderId = orderResult.rows[0].id;

    // 2. Insert each item into the 'order_items' table
    for (const item of items) {
      await query(
        `INSERT INTO order_items_temp (order_id, pizza_id, quantity, price_at_purchase, size) 
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.id, item.quantity, item.base_price, item.size],
      );
    }

    return { success: true, orderId };
  } catch (error) {
    console.error("Order Database Error:", error);
    return { success: false, error: "Failed to save order" };
  }
}
// **** ADMIN FUNCTIONs ****

export async function getOrderItems(orderId) {
  try {
    const result = await query(
      `SELECT oi.*, p.name, p.image_url 
       FROM order_items_temp oi 
       JOIN pizzas p ON oi.pizza_id = p.id 
       WHERE oi.order_id = $1`,
      [orderId],
    );
    return { success: true, items: result.rows };
  } catch (error) {
    console.error("Fetch Order Items Error:", error);
    return { success: false, error: "Failed to fetch items" };
  }
}

// Update order status (Bonus: for the admin to mark as 'Delivered')
export async function updateOrderStatus(orderId, status) {
  try {
    await query("UPDATE orders_temp SET status = $1 WHERE id = $2", [
      status,
      orderId,
    ]);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
