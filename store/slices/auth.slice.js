import {
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import { api, bff } from '../../services/api.services';

export const login = createAsyncThunk(
	'auth/login',
	async (credentials) => {
		const { data } = await bff.post('/api/login', credentials);
		return data;
	}
);

const initState = {
	accessToken: {},
	loading: 'loading',
	user: null,
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initState,
	reducers: {
		updateAccessToken(state, action) {
			state.accessToken = action.payload.accessToken;
		},
		reset: () => initState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, {payload}) => {
				state.accessToken = `Bearer ${payload.access_token}`;
				state.user = payload?.user;
				state.loading = 'idle';
			})
			.addCase(login.rejected, (state, {error}) => {
				state = { ...initState, error: error };
				throw new Error(error.message);
			});
	},
});

export const { updateAccessToken, reset } = authSlice.actions;
