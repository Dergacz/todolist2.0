import {TaskStateType, TodolistType} from "../App";
import {addTodolistAC, todolistReducer} from "./todolistReducer";
import {taskReducer} from "./taskReducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
