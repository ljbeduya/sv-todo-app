
import * as db from '$lib/server/database';
import { json } from '@sveltejs/kit';

export const PUT = async ({ request, cookies }) => {
    const { id, done } = await request.json();
    const userid = cookies.get('userId') as string;
    
    // Update the todo item in the database
    // Assuming you have a function updateTodo that updates a todo item by id
    await db.toggleTodo({ userid, id, done });
    
    return json({ message: 'Todo updated successfully', status: 204 });
}