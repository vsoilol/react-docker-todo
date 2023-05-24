import React, { useState } from 'react';
import {Todo} from "../../models/Todo";
import {TodoItem} from "../todo-item";
import {TodoForm} from "../todo-form";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {addTodo, completeTodo, removeTodo, updateTodo} from "../../features/todos/todosSlice";

export const TodoList = () => {
    const dispatch = useAppDispatch();
    const { todos } = useAppSelector(state => state.todos);

    const handleAddTodo = (todo: Todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        dispatch(addTodo(todo));
    };

    const handleUpdateTodo = (todoId: number, newValue: Todo) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        newValue.id = todoId;

        dispatch(updateTodo(newValue));
    };

    const handleRemoveTodo = (id: number) => {
        dispatch(removeTodo(id));
    };

    const handleCompleteTodo = (id: number) => {
        dispatch(completeTodo(id));
    };

    return (
        <>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={handleAddTodo} />
            <TodoItem
                todos={todos}
                completeTodo={handleCompleteTodo}
                removeTodo={handleRemoveTodo}
                updateTodo={handleUpdateTodo}
            />
        </>
    );
}
