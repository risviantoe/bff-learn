import { api } from '../../services/api.services';

export default async function handler(req, res) {
	const { body } = req;
	try {
		const { data, headers: returnedHeaders } = await api.post('/api/auth/login', body);
    const { access_token } = data;
    api.defaults.headers.Authorization = `Bearer ${access_token}`;
		Object.keys(returnedHeaders).forEach(key => res.setHeader(key, returnedHeaders[key]));
		
		return res.send(data.user);
	} catch ({ response: { status, data } }) {
		res.status(status).json(data)
	}
}
