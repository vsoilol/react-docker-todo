import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "../../models/Todo";

interface InitialState {
    todos: Todo[];
}

const initialState: InitialState = {
    todos: [],
};

const slice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<Todo>) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(todo => todo?.id !== action.payload)
        },
        updateTodo(state, action: PayloadAction<Todo>) {
            state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
        },
        completeTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    todo.isComplete = !todo.isComplete;
                }
                return todo;
            });
        }
    },
});

export const {addTodo, removeTodo, updateTodo, completeTodo} = slice.actions;

export default slice.reducer;