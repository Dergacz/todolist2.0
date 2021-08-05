import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistType) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id);
            setTitle("");
        } else {
            setError("Title is required");
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const changeFilterAll = () => {
        props.changeFilter("all", props.id)
    }

    const changeFilterCompleted = () => {
        props.changeFilter("completed", props.id)
    }

    const changeFilterActive = () => {
        props.changeFilter("active", props.id)
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={onRemoveTodolistHandler}>x</button>
            </h3>

            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={addTask}
                >+
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTaskHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return <li
                            className={t.isDone ? "is-done" : ""}
                            key={t.id}>
                            <input
                                type={"checkbox"}
                                checked={t.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>
                                {t.title}
                            </span>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={changeFilterAll}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={changeFilterActive}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={changeFilterCompleted}>
                    Completed
                </button>
            </div>
        </div>
    )
}