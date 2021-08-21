import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {FilterValuesType, TodolistDomainType} from './state/todolistReducer';
import {TaskPriorities, TaskStatuses, TaskType} from './api/tasksApi';
import {TaskStateType} from './state/taskReducer';

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodolistDomainType[]>([
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

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {
                id: v1(),
                title: 'TS',
                status: TaskStatuses.Completed,
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
                status: TaskStatuses.New,
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
                status: TaskStatuses.Completed,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true,
                addedDate: '',
                description: ''
            }
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId);
        setTasks({...tasks});
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    const addTask = (taskTitle: string, todolistId: string) => {
        const task: TaskType = {
            id: v1(),
            title: taskTitle,
            status: TaskStatuses.New,
            todoListId: todolistId,
            startDate: '',
            deadline: '',
            order: 0,
            priority: TaskPriorities.Low,
            completed: true,
            addedDate: '',
            description: ''
        }
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        const todolistTasks = tasks[todolistId];
        const task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.status = status;
            setTasks({...tasks});
        }
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks});
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistDomainType = {id: newTodolistId, title, filter: 'all', addedDate: '', order: 0}
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        });
    }

    const changeTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId];
        const task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
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
                                            changeTaskTitle={changeTitle}
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

export default App;


