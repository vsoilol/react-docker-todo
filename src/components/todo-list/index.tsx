import React, {useState} from 'react';
import {Todo} from "../../models/Todo";
import {TodoItem} from "../todo-item";
import {TodoForm} from "../todo-form";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    useAddTodoMutation,
    useEditTodoMutation,
    useGetTodosQuery, useLazyGetTodoByIdQuery,
    useRemoveTodoMutation
} from "../../app/services/todos";

export const TodoList = () => {
    const {data: todos} = useGetTodosQuery()
    const [addNewTodo] = useAddTodoMutation()
    const [updateTodo] = useEditTodoMutation()
    const [removeTodo] = useRemoveTodoMutation()
    const [getTodoById, {data: todo}] = useLazyGetTodoByIdQuery()
    const dispatch = useAppDispatch();

    const handleAddTodo = (todo: Todo) => {
        if (!todo.text || /^\s*$/.test(todo.text) || !todos) {
            return;
        }

        const todoMaxId = todos.length > 0 ? todos.reduce(
            (prev, current) => {
                return prev.id > current.id ? prev : current
            }
        ).id : 1

        todo.id = todoMaxId + 1;

        addNewTodo(todo)
    };

    const handleUpdateTodo = (todoId: number, updatedTodo: Todo) => {
        if (!updatedTodo.text || /^\s*$/.test(updatedTodo.text)) {
            return;
        }

        updatedTodo.id = todoId;

        updateTodo(updatedTodo)
    };

    const handleRemoveTodo = (id: number) => {
        removeTodo(id)
    };

    const handleCompleteTodo = (id: number) => {
        getTodoById(id).unwrap().then(_ => {
            const updatedTodo = {..._};
            updatedTodo.isComplete = !updatedTodo.isComplete;
            updateTodo(updatedTodo)
        });
    };

    return (
        <>
            <h1>Какой план на сегодня?</h1>
            <TodoForm onSubmit={handleAddTodo}/>
            <TodoItem
                todos={todos ? todos : []}
                completeTodo={handleCompleteTodo}
                removeTodo={handleRemoveTodo}
                updateTodo={handleUpdateTodo}
            />
        </>
    );
}
