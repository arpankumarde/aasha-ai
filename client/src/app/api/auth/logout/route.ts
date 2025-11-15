import { NextResponse } from "next/server"
import { serialize } from "cookie"

const COOKIE_NAME = "ashaa_user"

export async function POST() {
  try {
    console.log("[LOGOUT] request received")
    const cookie = serialize(COOKIE_NAME, "", { path: "/", maxAge: 0 })
    return NextResponse.json({ message: "Logout successful" }, { headers: { "Set-Cookie": cookie } })
  } catch (err) {
    console.error("[LOGOUT] ERROR:", err)
    return NextResponse.json({ error: "Failed to logout", details: String(err) }, { status: 500 })
  }
}
