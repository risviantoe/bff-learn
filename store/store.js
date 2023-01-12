import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper';
import { authSlice } from './slices/auth.slice';

const combinedReducers = combineReducers({
	authReducer: authSlice.reducer,
});

const rootReducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state,
			...action.payload,
		};
		return nextState;
	}
	return combinedReducers(state, action);
};

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { storeKey: 'key' });
