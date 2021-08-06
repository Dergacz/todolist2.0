import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";

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
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: TodolistType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const onChangeHandlerTitle = (newValue: string) => {
        props.changeTodolistTitle(props.id, newValue)
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
            <h3><EditableSpan
                value={props.title}
                onChange={onChangeHandlerTitle}
            />
                <button onClick={onRemoveTodolistHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTaskHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        const onChangeHandlerSpan = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <li
                            className={t.isDone ? "is-done" : ""}
                            key={t.id}>
                            <input
                                type={"checkbox"}
                                checked={t.isDone}
                                onChange={onChangeHandler}
                            />
                            <EditableSpan
                                value={t.title}
                                onChange={onChangeHandlerSpan}
                            />
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