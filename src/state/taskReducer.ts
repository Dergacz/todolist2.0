import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolistReducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/tasksApi';

const initialState: TaskStateType = {};

export type TaskStateType = {
    [key: string]: TaskType[]
}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const taskReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId);
            return {...state}
        }
        case "ADD_TASK": {
            const task: TaskType = {
                id: v1(),
                title: action.taskTitle,
                status: TaskStatuses.New,
                completed: false,
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                todoListId: action.todolistId,
                order: 0,
                addedDate: '',
                description: ''

            }
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = [task, ...todolistTasks];
            return {...state};
        }
        case "CHANGE_TASK_STATUS": {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                ? {...t, status: action.status}
                    : t)
            return {...state};
        }
        case "CHANGE_TASK_TITLE": {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.newTitle}
                    : t)
            return {...state};
        }
        case "ADD_TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case "REMOVE_TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.todolistId];
            return stateCopy;
        }
        default: {
            return {...state};
        }
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE_TASK",
    taskId,
    todolistId
} as const);
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const addTaskAC = (taskTitle: string, todolistId: string) => ({
    type: "ADD_TASK",
    taskTitle,
    todolistId
} as const);
export type AddTaskActionType = ReturnType<typeof addTaskAC>

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: "CHANGE_TASK_STATUS",
    taskId,
    status,
    todolistId
} as const);
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({
    type: "CHANGE_TASK_TITLE",
    taskId,
    newTitle,
    todolistId
} as const);
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
