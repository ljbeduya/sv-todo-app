import { json } from "@sveltejs/kit";
import * as db from "$lib/server/database";

export const PUT = async ({ request, cookies, params }) => {
  const id = params.id;
  const userid = cookies.get("userid") as string;
  const { done } = await request.json();

  db.toggleTodo({ userid, id, done });

  return json({ message: "Todo updated successfully", status: 204 });
};

export const DELETE = async ({ cookies, params }) => {
  const userid: string = cookies.get("userid") as string;
  const id = params.id;

  db.deleteTodo({ userid, id });

  return json({ message: "Todo deleted successfully", status: 204 });
};
