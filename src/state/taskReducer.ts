import {TaskStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistReducer";

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const taskReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId);
            return {...state}
        }
        case "ADD_TASK": {
            const task: TaskType = {id: v1(), title: action.taskTitle, isDone: false}
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = [task, ...todolistTasks];
            return {...state};
        }
        case "CHANGE_TASK_STATUS": {
            const todolistTasks = state[action.todolistId];
            const task = todolistTasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return {...state};
        }
        case "CHANGE_TASK_TITLE": {
            const todolistTasks = state[action.todolistId];
            const task = todolistTasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.newTitle;
            }
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

export const removeTask = (taskId: string, todolistId: string) => ({
    type: "REMOVE_TASK",
    taskId,
    todolistId
} as const);
export type RemoveTaskActionType = ReturnType<typeof removeTask>

export const addTask = (taskTitle: string, todolistId: string) => ({
    type: "ADD_TASK",
    taskTitle,
    todolistId
} as const);
export type AddTaskActionType = ReturnType<typeof addTask>

export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: "CHANGE_TASK_STATUS",
    taskId,
    isDone,
    todolistId
} as const);
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>

export const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => ({
    type: "CHANGE_TASK_TITLE",
    taskId,
    newTitle,
    todolistId
} as const);
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>
