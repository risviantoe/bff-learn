import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { bff } from '../services/api.services';

const Home = () => {
	const [email] = useState('edwin.risvianto@aqi.co.id');
	const [user, setUser] = useState({});
    const [content, setContent] = useState({});

	async function onSubmit() {
		try {
            // const { payload } = await store.dispatch(login({ email: email }));
            const { data } = await bff.post('api/login', { email: email });
			setUser(data);
		} catch (e) {
			console.error('error', e);
		}
    };
    
    async function getUser() {
		try {
			const { data } = await bff.get('/api/user');
			console.log(data);
		} catch (e) {
			console.error('error', e);
		}
	}

	async function getNews() {
		try {
			const { data } = await bff.get('/api/news');
			setContent(data);
		} catch (e) {
			console.error('error', e);
		}
	}

	if (Object.keys(user).length === 0) {
		return (
			<div>
				<button type="submit" onClick={onSubmit}>
					Login
				</button>
			</div>
		);
	}

	return (
		<div>
			<h1>User logged in: {user.name}</h1>
			<button onClick={() => getNews()}>News</button>
			<button onClick={() => getUser()}>User</button>
			<p>--------------------</p>
			{content
				? content?.data?.map((item) => (
						<div key={item.id}>
							<h4>{item.title}</h4>
							<p>{item.content}</p>
							<p>------</p>
						</div>
				  ))
				: ''}
		</div>
	);
};

export default Home;
