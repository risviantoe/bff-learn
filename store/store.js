import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper';
import { authSlice } from './slices/auth';

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

export const store = {
	reducer: rootReducer,
};
const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { storeKey: 'key' });
