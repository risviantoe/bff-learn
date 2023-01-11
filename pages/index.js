import { useEffect, useState } from "react";
import { bff } from "./services/api.services";

export default function Home() {
    const [email] = useState("edwin.risvianto@aqi.co.id");
    const [user, setUser] = useState({});
    const [content, setContent] = useState({});

    if (Object.keys(user).length === 0)
        return (
            <div>
                <button type="submit" onClick={onSubmit}>
                    Login
                </button>
            </div>
        );

    async function onSubmit() {
        try {
            const { data } = await bff.post("/api/login", {
                email: email,
            });
            setUser(data);

            // getUser();
        } catch (e) {
            console.error("error", e);
        }
    }

    async function getUser() {
        try {
            const { data } = await bff.get("/api/user");
            setUser(data);
        } catch (e) {
            console.error("error", e);
        }
    }

    async function getNews() {
        try {
            const { data } = await bff.get("/api/news");
            setContent(data);
        } catch (e) {
            console.error("error", e);
        }
    }

    async function getAnnouncement() {
        try {
            const { data } = await bff.get("/api/announcement");
            setContent(data);
        } catch (e) {
            console.error("error", e);
        }
    }

    return (
        <div>
            <h1>User logged in: {user.name}</h1>
            <button onClick={() => getNews()}>News</button>
            <p>--------------------</p>
            {content ? content?.data?.map((item) => (
                <div>
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
					<p>------</p>
                </div>
			))
            : ''}
        </div>
    );
}
