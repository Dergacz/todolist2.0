import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {taskAPI} from '../api/tasksApi';

export default {
    title: 'API Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const onClickHandler = () => {
        taskAPI.getTask(todolistId)
            .then((res) => {
                setState(res.data);
            })
        setTodolistId('');
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
            <button onClick={onClickHandler}>Get Tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const onClickHandler = () => {
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
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
            <button onClick={onClickHandler}>Create Task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const onClickHandler = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
        setTodolistId('');
        setTaskId('');
    }

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value);
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
                placeholder={'taskId'}
                value={taskId}
                onChange={onChangeTaskIdHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>Delete Task</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const onClickHandler = () => {
        taskAPI.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
        setTodolistId("");
        setTaskId("");
        setTitle("");
    }

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value);
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
            <div>
                <input
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={onChangeTodolistIdHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <input
                    placeholder={'taskId'}
                    value={taskId}
                    onChange={onChangeTaskIdHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <input
                    placeholder={'title'}
                    value={title}
                    onChange={onChangeTitleHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={onClickHandler}>Update Task Title</button>
            </div>
        </div>
    </div>
}