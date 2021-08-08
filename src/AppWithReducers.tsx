import React, {useReducer, useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/taskReducer";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, dispatchToTodolist] = useReducer(todolistReducer, [
        {
            id: todolistId1,
            title: "What to buy",
            filter: "all"
        },
        {
            id: todolistId2,
            title: "What to learn",
            filter: "all"
        }
    ]);

    const [tasks, dispatchToTask] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), title: "TS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Tea", isDone: true}
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId);
        dispatchToTask(action);
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(value, todolistId);
        dispatchToTodolist(action);
    }

    const addTask = (taskTitle: string, todolistId: string) => {
        const action = addTaskAC(taskTitle, todolistId);
        dispatchToTask(action);
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatchToTask(action);
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatchToTodolist(action);
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTask(action);
        dispatchToTodolist(action)
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatchToTask(action);
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatchToTodolist(action);
    }

    return (
        <div className="App">
            <AppBar
                position={"static"}>
                <Toolbar>
                    <IconButton
                        edge={"start"}
                        color={"inherit"}
                        aria-label={"menu"}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    style={{padding: "20px"}}
                >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid
                    container
                    spacing={3}
                >
                    {
                        todolists.map(tl => {
                            const allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;
                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>

                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container>


        </div>
    );
}

export default AppWithReducers;


