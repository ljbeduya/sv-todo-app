import * as db from "$lib/server/database";
import { redirect, fail, error } from "@sveltejs/kit";

export const load = async ({ cookies, params }) => {
  const userid: string = cookies.get("userid") as string;
  const id = params.id;

  const todo = db.getTodo({ userid, id });
  if (!todo) {
    throw error(404, "Todo not found");
  }
  return { todo };
};

export const actions = {
  update: async ({ cookies, request, params }) => {
    const userid: string = cookies.get("userid") as string;
    const form = await request.formData();
    const description = form.get("description") as string;
    const id = params.id;

    if (!description || description.trim() === "") {
      return fail(422, {
        error: "Todo must not be empty",
      });
    }

    const updatedTodo = await db.updateTodo({ userid, id, description });
    if (!updatedTodo) {
      return error(404, "Todo not found");
    }
    redirect(307, "../todo");
  },
  delete: async ({ cookies, params }) => {
    const userid: string = cookies.get("userid") as string;
    const id = params.id;

    db.deleteTodo({ userid, id });
    redirect(307, "../todo");
  },
};
