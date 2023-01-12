import { api } from '../../services/api.services';

export default async function handler(req, res) {
	const { headers } = req;
	try {
		const { data, headers: returnedHeaders } = await api.post('/api/auth/refresh', undefined, { headers });
		const { access_token } = data;
		api.defaults.headers.Authorization = `Bearer ${access_token}`;
		Object.keys(returnedHeaders).forEach(key => res.setHeader(key, returnedHeaders[key]));
		res.send(data);
	} catch ({ response: { status, data } }) {
		res.status(status).json(data)
	}
}
