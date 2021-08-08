import React from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const todolists = useSelector<AppStateType, TodolistType[]>(state => state.todolist);
    const tasks = useSelector<AppStateType, TaskStateType>(state => state.task);
    const dispatch = useDispatch();

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId);
        dispatch(action);
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(value, todolistId);
        dispatch(action);
    }

    const addTask = (taskTitle: string, todolistId: string) => {
        const action = addTaskAC(taskTitle, todolistId);
        dispatch(action);
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatch(action);
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatch(action);
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatch(action);
    }

    return (
        <div className="App">
            <AppBar
                position={"static"}>
                <Toolbar className={"toolbar"}>
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
                    <Button
                        color={"inherit"}>
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

export default AppWithRedux;


