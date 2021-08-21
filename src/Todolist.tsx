import React, {useCallback} from 'react';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {EditableSpan} from './components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './components/Task/Task';
import {TaskStatuses, TaskType} from './api/tasksApi';
import {FilterValuesType} from './state/todolistReducer';

type TodolistType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodolistType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const onRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const onChangeHandlerTitle = (newValue: string) => {
        props.changeTodolistTitle(props.id, newValue)
    }

    const changeFilterAll = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id]);

    const changeFilterCompleted = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id]);

    const changeFilterActive = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id]);

    let tasksForTodolist = props.tasks;
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
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
                {tasksForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                    todolistId={props.id}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />)}
            </div>

            <div>
                <Button
                    variant={'contained'}
                    color={props.filter === 'all' ? 'primary' : 'default'}
                    onClick={changeFilterAll}
                >All
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'active' ? 'primary' : 'default'}
                    onClick={changeFilterActive}
                >Active
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'completed' ? 'primary' : 'default'}
                    onClick={changeFilterCompleted}>
                    Completed
                </Button>
            </div>
        </div>
    )
})