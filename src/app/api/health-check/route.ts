import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ ok: false, error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const parsed = new URL(targetUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return NextResponse.json({ ok: false, error: "Invalid protocol" }, { status: 400 });
    }

    const start = Date.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    let res: Response;
    try {
      res = await fetch(targetUrl, {
        method: "HEAD",
        signal: controller.signal,
        headers: { "User-Agent": "Achinta-Portal-Monitor/1.0" },
      });
    } catch {
      // Fallback to GET if HEAD method is disallowed by server
      res = await fetch(targetUrl, {
        method: "GET",
        signal: controller.signal,
        headers: { "User-Agent": "Achinta-Portal-Monitor/1.0" },
      });
    }

    clearTimeout(timeoutId);
    const latencyMs = Date.now() - start;

    return NextResponse.json({
      ok: res.ok || res.status < 400,
      status: res.status,
      latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unreachable";
    return NextResponse.json({
      ok: false,
      error: message,
      status: 0,
      latencyMs: null,
      timestamp: new Date().toISOString(),
    });
  }
}
