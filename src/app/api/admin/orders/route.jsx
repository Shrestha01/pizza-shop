import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// Force Next.js to always fetch new data (No Caching)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await query(
      "SELECT * FROM orders_temp ORDER BY created_at DESC",
    );
    return NextResponse.json({ orders: result.rows });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
