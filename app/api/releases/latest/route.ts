import { NextResponse } from "next/server";

// Proxy GitHub releases to avoid client-side rate limits/CORS
export async function GET() {
  const githubApiUrl =
    "https://api.github.com/repos/samcuxx/WinCux/releases/latest";

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "WinCux-App",
  };

  // Optional: use server-side token if provided to increase rate limits
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(githubApiUrl, {
    headers,
    // Revalidate at most every 10 minutes
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `GitHub API error: ${res.status}` },
      { status: res.status }
    );
  }

  const data = await res.json();

  const response = NextResponse.json(data);
  // Cache at the edge for 10 minutes, allow stale while revalidate
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=300"
  );
  return response;
}
