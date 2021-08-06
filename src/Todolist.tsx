import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
                <IconButton onClick={onRemoveTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
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
                        return <div
                            className={t.isDone ? "is-done" : ""}
                            key={t.id}>
                            <Checkbox
                                color={"primary"}
                                checked={t.isDone}
                                onChange={onChangeHandler}
                            />
                            <EditableSpan
                                value={t.title}
                                onChange={onChangeHandlerSpan}
                            />
                            <IconButton onClick={removeTaskHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button
                    variant={"contained"}
                    color={props.filter === "all" ? "primary" : "default"}
                    onClick={changeFilterAll}
                >All
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "active" ? "primary" : "default"}
                    onClick={changeFilterActive}
                >Active
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "completed" ? "primary" : "default"}
                    onClick={changeFilterCompleted}>
                    Completed
                </Button>
            </div>
        </div>
    )
}