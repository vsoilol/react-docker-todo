import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Todo} from "../../models/Todo";

export const todosApi = createApi({
    reducerPath: 'todo/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/'
    }),
    refetchOnFocus: true,
    tagTypes: ['Todos'],
    endpoints: build => ({
        getTodos: build.query<Todo[], void>({
            query: () => ({
                url: `todos`
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: 'Todos' as const, id})),
                        {type: 'Todos', id: 'LIST'},
                    ]
                    : [{type: 'Todos', id: 'LIST'}],
        }),
        getTodoById: build.query<Todo, number>({
            query: (id: number) => ({
                url: `todos/${id}`
            }),
            providesTags: (result, error, id) => [{type: 'Todos', id}],
        }),
        addTodo: build.mutation<Todo, Todo>({
            query: (body) => ({
                url: `todos`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Todos'],
        }),
        editTodo: build.mutation<Todo, Todo>({
            query: (body) => ({
                url: `todos/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Todos', id: arg.id}],
        }),
        removeTodo: build.mutation<Todo, number>({
            query: (body) => ({
                url: `todos/${body}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos'],
        }),
    })
})

export const {
    useGetTodosQuery,
    useGetTodoByIdQuery,
    useLazyGetTodoByIdQuery,
    useAddTodoMutation,
    useEditTodoMutation,
    useRemoveTodoMutation
} = todosApi