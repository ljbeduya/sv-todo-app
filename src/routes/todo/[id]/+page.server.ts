import type { PageServerLoad } from '../$types';
import type { Actions } from '../$types';
import * as db from '$lib/server/database';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({cookies, params}) => {
    const userid: string = cookies.get('userid') as string;
    const id = params.id;
    
    return {
        todo: db.getTodo({ userid, id})
    }
};

export const actions = {
    update: async ({ cookies, request, params}) => {
        const userid: string = cookies.get('userid') as string;
        const form = await request.formData();
        const description = form.get('description') as string;
        const id = params.id;

        if (!description || description.trim() === '') {
            return fail(422, {
                error: 'Todo must not be empty'
            });
        }

        db.updateTodo({userid, id, description});
        redirect(307, '../todo')
    },
    delete: async ({ cookies, params }) => {
        const userid: string = cookies.get('userid') as string;
        const id = params.id;

        db.deleteTodo({userid, id});
        redirect(307, '../todo');
    }
} satisfies Actions;