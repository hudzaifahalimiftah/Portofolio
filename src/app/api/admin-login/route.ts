import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correct = process.env.ADMIN_PASSWORD;

    if (!correct) {
      return NextResponse.json({ success: false, message: 'Server misconfigured.' }, { status: 500 });
    }

    if (password === correct) {
      return NextResponse.json({ success: true });
    }

    // Delay to prevent brute-force attacks
    await new Promise(r => setTimeout(r, 800));
    return NextResponse.json({ success: false, message: 'Wrong password.' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }
}
