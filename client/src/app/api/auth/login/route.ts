import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { serialize } from "cookie"

const COOKIE_NAME = "ashaa_user"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 28 // 28 days

export async function POST(req: Request) {
  try {
    console.log("[LOGIN] request received")
    const body = await req.json()
    console.log("[LOGIN] body:", body)

    const { email, password } = body
    if (!email || !password) {
      console.log("[LOGIN] missing fields")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      console.log("[LOGIN] user not found:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log("[LOGIN] invalid password for:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const userData = { id: user.id, name: user.name, email: user.email }
    const cookieValue = JSON.stringify(userData)

    const setCookieHeader = serialize(COOKIE_NAME, cookieValue, {
      httpOnly: true,
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    console.log("[LOGIN] authenticated user id:", user.id)
    return NextResponse.json(
      { message: "Login successful", user: userData },
      { headers: { "Set-Cookie": setCookieHeader } }
    )
  } catch (err) {
    console.error("[LOGIN] ERROR:", err)
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    )
  }
}
