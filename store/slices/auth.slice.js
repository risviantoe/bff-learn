import { createSlice, SerializedError, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { bff } from '../../services/api.services';

export const login = createAsyncThunk(
	'auth/login',
	async (credentials, thunkAPI) => {
		try {
			const response = await bff.post('/api/login', credentials);
			const refetch = await bff.get('/api/user', {
				headers: {
					Authorization: `Bearer ${response.data.access_token}`
				}
			});
			return {
				accessToken: response.data.access_token,
				user: { name: refetch.data.name },
			};
		} catch (error) {
			// return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

const initState = {
	accessToken: '',
	loading: 'idle',
	user: null,
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initState,
	reducers: {
		updateAccessToken(state, action) {
			state.accessToken = action.payload.access_token;
		},
		reset: () => initState,
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			console.log(action?.payload);
			state.accessToken = action.payload?.access_token;
			state.user = action.payload?.user;
			state.loading = 'idle';
		});
		builder.addCase(login.rejected, (state, action) => {
			state = { ...initState, error: action.error };
			// throw new Error(action.error.message);
		});
	}
});

export const { updateAccessToken, reset } = authSlice.actions;
