import { api } from '../../services/api.services';

export default async function handler(req, res) {
	const { headers, body } = req;
	try {
		const { data, headers: returnedHeaders } = await api.post('/api/auth/login', body, { headers });
		Object.keys(returnedHeaders).forEach(key => res.setHeader(key, returnedHeaders[key]));
		res.send(data);
	} catch ({ response: { status, data } }) {
		res.status(status).json(data)
	}
}
