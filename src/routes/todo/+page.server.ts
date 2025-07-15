import * as db from "$lib/server/database";

export const load = ({ cookies, depends }) => {
  let userid = cookies.get("userid");

  if (!userid) {
    userid = crypto.randomUUID();
    cookies.set("userid", userid, { path: "/" });
  }

  depends("app:todolist");

  return {
    todos: db.getTodos(userid),
  };
};
