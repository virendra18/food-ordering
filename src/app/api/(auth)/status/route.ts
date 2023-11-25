import jwt from "jsonwebtoken";
import db from "@/lib/db";
const secret = process.env.JWT_SECRET;
import { cookies } from "next/headers";

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

    const res = JSON.stringify({ success: true, data: user });
    return new Response(res, {
      status: 200,
    });
  } catch (e: any) {
    return new Response("Internal server error", { status: 500 });
  }
}
