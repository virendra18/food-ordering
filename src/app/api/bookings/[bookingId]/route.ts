import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;

export async function GET(
  request: Request,
  { params }: { params: { bookingId: string } }
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
    const booking = await db.booking.findFirst({
      where: {
        userId: user.id,
        id: params.bookingId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return Response.json(
      {
        success: true,
        data: JSON.stringify(booking, (key, value) =>
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

export async function PATCH(
  request: Request,
  { params }: { params: { bookingId: string } }
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
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    console.log("user is admin", user.role);

    if (user.role === "ADMIN") {
      const booking = await db.booking.update({
        where: {
          id: params.bookingId,
        },
        data: {
          isCancelled: true,
        },
      });
    } else {
      const booking = await db.booking.update({
        where: {
          userId: user.id,
          id: params.bookingId,
        },
        data: {
          isCancelled: true,
        },
      });
    }

    return Response.json(
      {
        success: true,
        data: JSON.stringify({ success: true }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { bookingId: string } }
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
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    if (user.role === "ADMIN") {
      await db.booking.delete({
        where: {
          id: params.bookingId,
        },
      });
    } else {
      const booking = await db.booking.delete({
        where: {
          userId: user.id,
          id: params.bookingId,
        },
      });
    }
    return Response.json(
      {
        success: true,
        data: JSON.stringify({ success: true }, (key, value) =>
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
