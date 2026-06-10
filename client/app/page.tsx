"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8787";

export default function HomePage() {
  const router = useRouter();
  const [health, setHealth] = useState<string>("loading...");
  const [slug, setSlug] = useState<string>("test-room");

  useEffect(() => {
    fetch(`${BACKEND_URL}/health`)
      .then((r) => r.json())
      .then((data) => setHealth(JSON.stringify(data, null, 2)))
      .catch((e) => setHealth(`error: ${String(e)}`));
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>SquadWars</h1>

      <section style={{ marginTop: 16 }}>
        <h2>Backend health</h2>
        <pre
          style={{
            background: "#f4f4f4",
            color: "#111",
            padding: 12,
            borderRadius: 6,
            overflow: "auto",
          }}
        >
          {health}
        </pre>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Open auction room</h2>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="room id"
          style={{
            padding: 8,
            marginRight: 8,
            background: "#fff",
            color: "#111",
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
        <button
          onClick={() =>
            router.push(`/auctionroom/${encodeURIComponent(slug)}`)
          }
          style={{ padding: "8px 16px" }}
          disabled={!slug.trim()}
        >
          Open
        </button>
      </section>
    </main>
  );
}
