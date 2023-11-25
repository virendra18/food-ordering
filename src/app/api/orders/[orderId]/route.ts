import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
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
      where: { id: decoded.id },
      select: { id: true, email: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    const order = await db.order.findFirst({
      where: {
        userId: user.id,
        id: params.orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return Response.json(
      {
        success: true,
        data: order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
