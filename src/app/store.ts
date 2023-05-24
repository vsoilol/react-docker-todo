import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import todos from '../features/todos/todosSlice'
import {todosApi} from "./services/todos";

export const store = configureStore({
    reducer: {
        [todosApi.reducerPath]: todosApi.reducer,
        todos
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(todosApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
