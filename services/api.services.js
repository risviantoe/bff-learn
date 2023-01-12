import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as cookie from 'cookie'
import * as setCookie from 'set-cookie-parser'

export const bff = axios.create({
	baseURL: 'http://localhost:3001',
	withCredentials: true,
});

export const api = axios.create({
	baseURL: 'http://localhost:8013',
	withCredentials: true,
});

createAuthRefreshInterceptor(bff, failedRequest => 
    bff.post('/api/refresh').then(res => {
        if (bff.defaults.headers.setCookie) {
            delete bff.defaults.headers.setCookie
        }

        const {access_token} = res.data
        const bearer = `Bearer ${access_token}`
        api.defaults.headers.Authorization = bearer

        const responseCookie = setCookie.parse(res.headers['set-cookie'])[0]
        api.defaults.headers.setCookie = res.headers['set-cookie']
        api.defaults.headers.cookie = cookie.serialize(
            responseCookie.name,
            responseCookie.value
        )

        failedRequest.response.config.headers.Authorization = bearer

        return Promise.resolve()
    })
    )
