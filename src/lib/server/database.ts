import type { Todo } from '$lib/types/todo';

const database = new Map();

export function getTodos(userid: string) : Array<Todo>{
	if (!database.has(userid)) {
		createTodo({ userid, description: 'My to do' });
	}

	return Array.from(database.get(userid).values());
}

export function getTodo({userid, id}: Todo) : Todo {
	const todos = database.get(userid);
	return todos.get(id);
}

export function createTodo({ userid, description }: Todo) {
	if (!database.has(userid)) {
		database.set(userid, new Map());
	}

	const todos = database.get(userid);

	const id = crypto.randomUUID();

	todos.set(id, {
		id,
		description,
		done: false
	});

	return {
		id
	};
}

export function updateTodo({ userid, id, description }: Todo) {
	if (!database.has(userid)) {
		return null;
	}

	const todos = database.get(userid);

	if (!todos) return null;
	
	const todo = todos.get(id);

	if (!todo) return null;


	const updatedTodo = {
		...todo,
		description
	};

	todos.set(id, updatedTodo);

	return updatedTodo;
}

export function toggleTodo({ userid, id, done }: Todo): void {
	const todos = database.get(userid);
	todos.get(id).done = done;
}

export function deleteTodo({ userid, id }: Todo): void {
	const todos = database.get(userid);
	todos.delete(id);
}