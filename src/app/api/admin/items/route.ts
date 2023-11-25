import db from "@/lib/db";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;

export async function POST(request: Request) {
  const {
    itemName,
    itemPrice,
    itemRating,
    itemCategory,
    itemIsFeatured,
    itemIsAvailable,
    itemImageId,
    itemImageUrl,
  }: {
    itemPrice: number;
    itemRating: number;
    itemIsAvailable: boolean;
    itemIsFeatured: boolean;
    itemImageUrl: string;
    itemImageId: string;
    itemName: string;
    itemCategory: string;
  } = await request.json();

  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");

  try {
    if (token === undefined || token === null) {
      return new Response(
        JSON.stringify({ message: "Unauthorized: No token provided" }),
        {
          status: 401,
        }
      );
    }
    const decoded: any = jwt.verify(token.value, secret!);
    const user = await db.user.findUnique({
      where: { id: decoded.id, role: Role.ADMIN },
      select: { id: true, email: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await db.products.create({
      data: {
        name: itemName,
        price: itemPrice,
        category: itemCategory,
        ratings: itemRating,
        image_id: itemImageId,
        image_url: itemImageUrl,
        is_featured: itemIsFeatured,
        is_available: itemIsAvailable,
      },
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (e: any) {
    return new Response("Internal server error", { status: 500 });
  }
}
