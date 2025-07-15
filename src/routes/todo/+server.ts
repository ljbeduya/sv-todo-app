import * as db from "$lib/server/database";
import { json } from "@sveltejs/kit";

export const PUT = async ({ request, cookies }) => {
  const { id, done } = await request.json();
  const userid = cookies.get("userId") as string;

  await db.toggleTodo({ userid, id, done });

  return json({ message: "Todo updated successfully", status: 204 });
};
