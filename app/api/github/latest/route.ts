import { NextResponse } from "next/server";

// Simple edge-friendly cache for 5 minutes via Response headers
export async function GET() {
  const repo = process.env.WINCUX_REPO || "samcuxx/WinCux";
  const url = `https://api.github.com/repos/${repo}/releases/latest`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "WinCux-Website",
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(url, {
      headers,
      // Revalidate from GitHub at most every 300s to reduce rate limit risk
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        // Cache at the edge/browser for 5 minutes
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to reach GitHub" },
      { status: 502 }
    );
  }
}
