import axios from 'axios';
import { http } from './http';

export default async function handler(req, res) {
	try {
		const { data } = await http.post('/api/auth/login', req.body);
		const { access_token } = data;
		http.defaults.headers.Authorization = `Bearer ${access_token}`;
		res.status(200).json(data);
	} catch (e) {
		console.log('error', e);
	}
}
