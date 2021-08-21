import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolistApi';

export default {
    title: 'API Todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');

    const onClickHandler = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler();
        }
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'title'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const onClickHandler = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
        setTodolistId('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const onClickHandler = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
        setTodolistId('');
        setTitle('');
    }

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={onChangeTodolistIdHandler}
                onKeyPress={onKeyPressHandler}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>Update Todolist Title</button>
        </div>
    </div>
}
