import * as db from "$lib/server/database";
import { redirect } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export const actions = {
  create: async ({ cookies, request }) => {
    const userid: string = cookies.get("userid") as string;
    const form = await request.formData();
    const description = form.get("description") as string;

    if (!description || description.trim() === "") {
      return fail(422, {
        error: "Todo must not be empty",
      });
    }

    db.createTodo({ userid, description });
    redirect(307, "../todo");
  },
};
