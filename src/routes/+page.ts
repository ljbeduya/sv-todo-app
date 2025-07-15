import { redirect } from '@sveltejs/kit';


export function load() {
    redirect(307, '/todo');
}

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;


