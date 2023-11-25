import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
import db from "@/lib/db";

export async function POST(request: Request) {
  const { email, password }: { email: string; password: string } =
    await request.json();

  try {
    const existingUser = await db.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        profile: true,
      },
    });

    if (!existingUser) {
      return Response.json(
        { success: false, message: "No user exists with this credential" },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 400,
        }
      );
    }

    const token = jwt.sign({ id: existingUser.id }, secret!, {
      expiresIn: "24h",
    });

    const { password: pwd, ...userInfo } = existingUser;

    let res = JSON.stringify({
      success: true,
      message: "Log in Success",
      data: existingUser.id,
    });

    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

    console.log("profile", existingUser.profile);

    if (!existingUser.profile) {
      res = JSON.stringify({
        success: true,
        message: "Log in Success",
        data: existingUser.id,
        noProfile: true,
      });
    }

    return new Response(res, {
      status: 200,
      headers: {
        "Set-Cookie": `auth-token=${token}; Expires=${date.toUTCString()}; Path=/`,
      },
    });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}
