import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { serialize } from "cookie"

const COOKIE_NAME = "ashaa_user"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 28 // 28 days

export async function POST(req: Request) {
  try {
    console.log("[REGISTER] request received")
    const body = await req.json()
    console.log("[REGISTER] body:", body)

    const { name, email, password } = body
    if (!email || !password) {
      console.log("[REGISTER] missing fields")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      console.log("[REGISTER] user exists:", email)
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true },
    })

    console.log("[REGISTER] created user id:", newUser.id)

    const userCookie = { id: newUser.id, name: newUser.name, email: newUser.email }
    const cookieValue = JSON.stringify(userCookie)

    const setCookieHeader = serialize(COOKIE_NAME, cookieValue, {
      httpOnly: true,
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    console.log("[REGISTER] setting cookie header")

    return NextResponse.json(
      { message: "Signup successful", user: userCookie },
      { headers: { "Set-Cookie": setCookieHeader } }
    )
  } catch (err) {
    console.error("[REGISTER] ERROR:", err)
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    )
  }
}
