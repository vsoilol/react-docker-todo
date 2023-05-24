import React, {useState} from 'react';
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';
import {Todo} from "../../models/Todo";
import {TodoForm} from "../todo-form";

type Props<T> = {
    todos: T[];
    completeTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    updateTodo: (todoId: number, newValue: Todo) => void
};

export const TodoItem = ({todos, completeTodo, removeTodo, updateTodo}: Props<Todo>) => {
    const [todoEdit, setTodoEdit] = useState<Todo | null>(null);

    const submitUpdate = (value: Todo) => {
        if (todoEdit) {
            updateTodo(todoEdit.id, value);
        }

        setTodoEdit(null);
    };

    if (todoEdit) {
        return <TodoForm todo={todoEdit} onSubmit={submitUpdate}/>;
    }

    return (
        <>
            {todos.map((todo, index) => (
                <div
                    className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
                    key={index}
                >
                    <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                        {todo.text}
                    </div>
                    <div className='icons'>
                        <RiCloseCircleLine
                            onClick={() => removeTodo(todo.id)}
                            className='delete-icon'
                        />
                        <TiEdit
                            onClick={() => setTodoEdit(todo)}
                            className='edit-icon'
                        />
                    </div>
                </div>))}
        </>
    );
};
