import Link from "next/link";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8787";

export default async function AuctionRoomPage({
  params,
}: PageProps<"/auctionroom/[slug]">) {
  const { slug } = await params;

  let payload: unknown;
  let error: string | null = null;
  try {
    const res = await fetch(
      `${BACKEND_URL}/auctionroom/${encodeURIComponent(slug)}/status`,
      { cache: "no-store" }
    );
    payload = await res.json();
  } catch (e) {
    error = String(e);
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Auction Room</h1>
      <p>
        Slug: <code>{slug}</code>
      </p>

      <section style={{ marginTop: 16 }}>
        <h2>Status from backend</h2>
        <pre
          style={{
            background: "#f4f4f4",
            color: "#111",
            padding: 12,
            borderRadius: 6,
            overflow: "auto",
          }}
        >
          {error ?? JSON.stringify(payload, null, 2)}
        </pre>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/">← back to home</Link>
      </p>
    </main>
  );
}
