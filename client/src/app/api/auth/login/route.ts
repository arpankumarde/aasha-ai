import { NextResponse } from "next/server"

export async function POST(req: Request) {
  return NextResponse.json({ error: "Authentication not implemented" }, { status: 501 })
}
