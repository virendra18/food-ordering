import db from "@/lib/db";
const secret = process.env.JWT_SECRET;

export async function GET(request: Request) {
  try {
    const items = await db.products.findMany();
    return Response.json(items, {
      status: 200,
    });
  } catch (e: any) {
    return new Response("Internal server error", { status: 500 });
  }
}
