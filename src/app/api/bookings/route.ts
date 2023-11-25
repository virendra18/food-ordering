import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;

interface ReqBody {
  name: string;
  size: string;
  phone: string;
  timing: string;
  occasion: string;
  specialrequest: string;
}
export async function POST(request: Request) {
  const { name, size, occasion, timing, phone, specialrequest }: ReqBody =
    await request.json();

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
    const newBooking = await db.booking.create({
      data: {
        name,
        phone,
        size: Number(size),
        timing: Number(timing),
        occasion,
        specialrequest,
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(
      { success: true, bookingDetails: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: Request) {
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
    const bookings = await db.booking.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        isCancelled: true,
        size: true,
        timing: true,
      },
    });

    return Response.json(
      {
        success: true,
        data: JSON.stringify(bookings, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        ),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
