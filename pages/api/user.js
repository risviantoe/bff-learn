import { api } from '../../services/api.services';

export default async function handler(req, res) {
	try {
		const { data } = await api.get('http://localhost:8013/api/user');
		const { user } = data;
		res.send(user);
	} catch ({ response: { status, data } }) {
		res.status(status).json(data)
	}
}
