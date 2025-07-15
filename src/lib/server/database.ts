import type { ITodo } from "$lib/types/todo";

const database = new Map();

export function getTodos(userid: string): Array<ITodo> {
  if (!database.has(userid)) {
    return [];
  }

  return Array.from(database.get(userid).values());
}

export function getTodo({ userid, id }: ITodo): ITodo {
  const todos = database.get(userid);
  return todos.get(id);
}

export function createTodo({ userid, description }: ITodo) {
  if (!database.has(userid)) {
    database.set(userid, new Map());
  }

  const todos = database.get(userid);

  const id = crypto.randomUUID();

  todos.set(id, {
    id,
    description,
    done: false,
  });

  return {
    id,
  };
}

export function updateTodo({ userid, id, description }: ITodo) {
  if (!database.has(userid)) {
    return null;
  }

  const todos = database.get(userid);

  if (!todos) return null;

  const todo = todos.get(id);

  if (!todo) return null;

  const updatedTodo = {
    ...todo,
    description,
  };

  todos.set(id, updatedTodo);

  return updatedTodo;
}

export function toggleTodo({ userid, id, done }: ITodo): void {
  const todos = database.get(userid);
  todos.get(id).done = done;
}

export function deleteTodo({ userid, id }: ITodo): void {
  const todos = database.get(userid);
  todos.delete(id);
}
