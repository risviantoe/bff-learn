import { api } from '../services/api.services';

export default async function handler(req, res) {
    try {
        const { data } = await api.get("/api/news");
        res.send(data);
    } catch ({ response: { status, data } }) {
		res.status(status).json(data)
	}
}
