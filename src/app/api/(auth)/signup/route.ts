import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
import db from "@/lib/db";

export async function POST(request: Request) {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = await request.json();

  try {
    const existingUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        name: name,
        email,
        password: hashedPassword,
        role: Role.USER,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const token = jwt.sign({ id: newUser.id }, secret!, {
      expiresIn: "24h",
    });

    const res = JSON.stringify({
      success: true,
      message: "Signed up",
    });

    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

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
