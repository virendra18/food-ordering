import db from "@/lib/db";
const secret = process.env.JWT_SECRET;

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const items = await db.products.findMany({
      where: {
        category: params.category,
      },
    });
    return Response.json(
      { data: items },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return new Response("Internal server error", { status: 500 });
  }
}
