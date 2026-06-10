import { Hono } from "hono";

export const auctionroom = new Hono();

auctionroom.get("/:id/status", (c) => {
  const id = c.req.param("id");
  return c.json({
    status: "joining",
    message: `joining auctionroom with this id: ${id}`,
    id,
  });
});
