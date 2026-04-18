import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const token = process.env.GITHUB_TOKEN;
    const repo  = process.env.GITHUB_REPO; // e.g. "hudzaifahalimiftah/Portofolio"

    if (!token || !repo) {
      return NextResponse.json(
        { success: false, message: 'Missing GITHUB_TOKEN or GITHUB_REPO env variable.' },
        { status: 500 }
      );
    }

    const filePath = 'src/data/data.json';
    const apiUrl   = `https://api.github.com/repos/${repo}/contents/${filePath}`;

    // 1. Get current file SHA (required by GitHub API to update a file)
    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!getRes.ok) {
      const err = await getRes.json();
      throw new Error(err.message ?? 'Failed to fetch file from GitHub.');
    }

    const { sha } = await getRes.json();

    // 2. Push updated content
    const content = Buffer.from(JSON.stringify(body, null, 2), 'utf-8').toString('base64');

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'chore: update data.json via admin CMS',
        content,
        sha,
      }),
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(err.message ?? 'Failed to push update to GitHub.');
    }

    return NextResponse.json({ success: true, message: 'data.json updated successfully.' });
  } catch (error) {
    console.error('Failed to update data.json:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to update data.json.' },
      { status: 500 }
    );
  }
}
