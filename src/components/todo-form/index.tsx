import React, {useState, useEffect, useRef, MouseEventHandler} from 'react';
import {Todo} from "../../models/Todo";

type Props<T> = {
    todo?: T;
    onSubmit: (value: T) => void;
};

export const TodoForm = ({todo, onSubmit}: Props<Todo>) => {
    const [input, setInput] = useState(todo ? todo.text : '');

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            isComplete: false
        });
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {todo ? (
                <>
                    <input
                        placeholder='Update your item'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        ref={inputRef}
                        className='todo-input edit'
                    />
                    <button onClick={handleSubmit} className='todo-button edit'>
                        Update
                    </button>
                </>
            ) : (
                <>
                    <input
                        placeholder='Add a todo'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        className='todo-input'
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} className='todo-button'>
                        Add todo
                    </button>
                </>
            )}
        </form>
    );
}
