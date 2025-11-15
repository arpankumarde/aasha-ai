import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    console.log("[CHECK] request received")

    // cookies() is async in this runtime — await it first
    const cookieStore = await cookies()
    const cookie = cookieStore.get("ashaa_user")

    if (!cookie) {
      console.log("[CHECK] no cookie found")
      return NextResponse.json({ loggedIn: false, user: null })
    }

    let parsed = null
    try {
      parsed = JSON.parse(cookie.value)
    } catch (e) {
      console.log("[CHECK] cookie parse failed", e)
      return NextResponse.json({ loggedIn: false, user: null })
    }

    if (!parsed?.id) {
      console.log("[CHECK] cookie missing id")
      return NextResponse.json({ loggedIn: false, user: null })
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(parsed.id) },
      select: { id: true, name: true, email: true },
    })

    if (!user) {
      console.log("[CHECK] user not found in DB for id:", parsed.id)
      return NextResponse.json({ loggedIn: false, user: null })
    }

    console.log("[CHECK] user found:", user.id)
    return NextResponse.json({ loggedIn: true, user })
  } catch (err) {
    console.error("[CHECK] ERROR:", err)
    return NextResponse.json({ loggedIn: false, user: null })
  }
}

