import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistReducer
} from './state/todolistReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from './state/taskReducer';
import {TaskPriorities, TaskStatuses} from './api/tasksApi';

function AppWithReducers() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, dispatchToTodolist] = useReducer(todolistReducer, [
        {
            id: todolistId1,
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: todolistId2,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0
        }
    ]);

    const [tasks, dispatchToTask] = useReducer(taskReducer, {
        [todolistId1]: [
            {
                id: v1(),
                title: 'TS',
                status: TaskStatuses.New,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true,
                addedDate: '',
                description: ''
            },
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true,
                addedDate: '',
                description: ''
            }
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true,
                addedDate: '',
                description: ''
            },
            {
                id: v1(),
                title: 'Tea',
                status: TaskStatuses.New,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: false,
                addedDate: '',
                description: ''
            }
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

    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, status, todolistId);
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
                position={'static'}>
                <Toolbar>
                    <IconButton
                        edge={'start'}
                        color={'inherit'}
                        aria-label={'menu'}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    style={{padding: '20px'}}
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
                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
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


