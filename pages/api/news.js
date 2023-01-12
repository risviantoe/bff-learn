import { api } from '../../services/api.services';

export default async function handler(req, res) {
	const { headers, body } = req;
    try {
        const { data } = await api.get("api/news", headers);
        res.send(data);
    } catch ({ response: { status, data } }) {
		res.status(status).json(data)
	}
}
