import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const filePath = path.join(process.cwd(), 'src', 'data', 'data.json');

    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'data.json updated successfully.' });
  } catch (error) {
    console.error('Failed to update data.json:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update data.json.' },
      { status: 500 }
    );
  }
}
