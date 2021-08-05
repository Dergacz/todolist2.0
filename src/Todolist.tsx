import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

export const Todolist = (props: TodolistType) => {
    const [title, setTitle] = useState<string>("");

    const addTask = () => {
        props.addTask(title);
        setTitle("")
    }

    const addTaskForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const changeFilterAll = () => {
        props.changeFilter("all")
    }

    const changeFilterCompleted = () => {
        props.changeFilter("completed")
    }

    const changeFilterActive = () => {
        props.changeFilter("active")
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={addTaskForEnter}
                />
                <button
                    onClick={addTask}
                >+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTaskHandler = () => {
                            props.removeTask(t.id)
                        }
                        return <li key={t.id}>
                            <input
                                type={"checkbox"}
                                checked={t.isDone}
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
                <button onClick={changeFilterAll}>All</button>
                <button onClick={changeFilterActive}>Active</button>
                <button onClick={changeFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}