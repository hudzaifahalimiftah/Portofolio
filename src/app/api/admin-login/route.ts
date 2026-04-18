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

    // Delay biar nggak bisa brute-force cepat
    await new Promise(r => setTimeout(r, 800));
    return NextResponse.json({ success: false, message: 'Password salah.' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }
}
