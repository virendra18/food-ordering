import jwt from "jsonwebtoken";
import db from "@/lib/db";
const secret = process.env.JWT_SECRET;
import { cookies } from "next/headers";

interface Props {
  name: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  phone: string;
}

export async function POST(request: Request) {
  const { name, city, address, pincode, state, phone }: Props =
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
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "No such user" }), {
        status: 401,
      });
    }
    const newProfile = await db.profile.create({
      data: {
        phone,
        state,
        address,
        city,
        pincode,
        userId: user.id,
      },
    });

    if (name !== user.name) {
      await db.user.update({
        data: {
          name: name,
        },
        where: { id: user.id },
      });
    }

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Internal server error" },
      },
      { status: 500 }
    );
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
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "No such user" }), {
        status: 401,
      });
    }
    const profiles = await db.profile.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return Response.json({ success: true, data: profiles }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Internal server error" },
      },
      { status: 500 }
    );
  }
}
