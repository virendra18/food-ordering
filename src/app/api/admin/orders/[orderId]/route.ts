import db from "@/lib/db";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const { status }: { status: string } = await request.json();
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

    await db.order.update({
      data: {
        order_status: status,
      },
      where: {
        id: params.orderId,
      },
    });
    return Response.json({ success: true }, { status: 200 });
  } catch (e) {
    return Response.json({ success: false }, { status: 500 });
  }
}
