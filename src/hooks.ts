import { app } from '$lib/firebase';
import cookie from 'cookie';
const auth = app.auth();
import type { GetContext, GetSession, Handle } from '@sveltejs/kit';

type Context = {
	token?: string,
	user: Record<string, unknown>
}
export const getContext: GetContext = async ({ headers }) => {
	const cookies = cookie.parse(headers.cookie || '');
	let user, session;
	try {
		session = cookies.session;
		if (session) {
			user = await auth.verifySessionCookie(session);
		}
	}
	catch (e) {
		console.error(e);
	}
	return {
		session,
		user
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: GetSession<Context> = ({ context }) => {
	return {
		user: context.user
	};
}