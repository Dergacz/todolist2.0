import {combineReducers, createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todolistReducer} from "./todolistReducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    task: taskReducer,
    todolist: todolistReducer
})
export const store = createStore(rootReducer);
export type AppStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;