import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, bff } from '../../services/api.services';

let token = '';
export const news = createAsyncThunk('news', async (credentials) => {
	const { data } = await bff.get('/api/news');

	return data;
});

const initState = {
	accessToken: {},
	loading: 'loading',
	user: null,
	error: null,
};

export const authSlice = createSlice({
	name: 'news',
	initialState: initState,
	reducers: {
		updateAccessToken(state, action) {
			state.accessToken = action.payload.accessToken;
		},
		reset: () => initState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(news.fulfilled, (state, { payload }) => {
				state.accessToken = `Bearer ${payload.access_token}`;
				state.user = payload?.user;
				state.loading = 'idle';
			})
			.addCase(news.rejected, (state, { error }) => {
				state = { ...initState, error: error };
				throw new Error(error.message);
			});
	},
});

export const { updateAccessToken, reset } = authSlice.actions;
