import { http } from './http';

export default async function handler(req, res) {
	try {
		const { data } = await http.get('/api/user');
		const { user } = data;
		res.status(200).json(user);
	} catch (e) {
		console.error('error', e);
	}
}
