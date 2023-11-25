import db from "@/lib/db";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;

export async function POST(request: Request) {
  const {
    userName,
    userAddress,
    userPhoneNo,
    totalPrice,
    itemsIdWithQuantity,
    city,
    state,
    pincode,
    orderStatus,
    razorpayOrderId,
    razorpayPaymentId,
  }: {
    userName: string;
    userAddress: string;
    userPhoneNo: string;
    city: string;
    state: string;
    pincode: string;
    totalPrice: number;
    orderStatus: string;
    itemsIdWithQuantity: { id: string; quantity: number }[];
    razorpayOrderId: string;
    razorpayPaymentId: string;
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
      where: { id: decoded.id },
      select: { id: true, email: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await db.order.create({
      data: {
        userId: user.id,
        name: userName,
        address: userAddress,
        phone: userPhoneNo,
        city,
        state,
        pincode,
        totalPrice: totalPrice,
        order_status: orderStatus,
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        orderItems: {
          create: itemsIdWithQuantity.map((itemIdWithQuantity) => ({
            product: {
              connect: {
                id: itemIdWithQuantity.id,
              },
            },
            quantity: itemIdWithQuantity.quantity,
          })),
        },
      },
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (e: any) {
    return new Response("Internal server error", { status: 500 });
  }
}
