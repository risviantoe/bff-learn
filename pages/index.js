import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { http } from './api/http';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [email, setEmail] = useState('edwin.risvianto@aqi.co.id');
	const [user, setUser] = useState({});

	useEffect(() => {
		// axios.get('/api/user').then((res) => {
		// 	console.log(res);
		// });
	}, [onSubmit]);

	// if (user)
	// 	return (
	// 		<div>
	// 			<h1>User logged in: {user.name}</h1>
	// 			{/* <button onClick={() => setUser(null)}>Logout</button> */}
	// 		</div>
	// 	);

	function onSubmit() {
		axios.post('/api/login', { email: email }).then((res) => {
			console.log(res);
      // setUser(res.user);
      getUser()
		});
	}

	function getUser() {
		http.get('http://localhost:8000/api/user').then((res) => {
			console.log(res);
		});
	}
	return (
		<>
			<div>
				<button type="submit" onClick={onSubmit}>
					Login
				</button>
			</div>
		</>
	);
}
