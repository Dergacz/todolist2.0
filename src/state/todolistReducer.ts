import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const initialState: TodolistType[] = [];

type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todolistReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "ADD_TODOLIST": {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        }
        case "CHANGE_TODOLIST_TITLE": {
            const todolist = state.find(tl => tl.id === action.todolistId);
            if (todolist) {
                todolist.title = action.newTitle;
            }
            return [...state];
        }
        case "CHANGE_TODOLIST_FILTER": {
            let todolist = state.find(tl => tl.id === action.todolistId);
            if (todolist) {
                todolist.filter = action.value;
            }
            return [...state];
        }
        default: {
            return state;
        }
    }
}

export const removeTodolistAC = (todolistId: string) => ({
    type: "REMOVE_TODOLIST",
    todolistId
} as const);
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export const addTodolistAC = (title: string) => ({
    type: "ADD_TODOLIST",
    title,
    todolistId: v1()
} as const);
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({
    type: "CHANGE_TODOLIST_TITLE",
    todolistId,
    newTitle
} as const);
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string) => ({
    type: "CHANGE_TODOLIST_FILTER",
    value,
    todolistId
} as const);
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>