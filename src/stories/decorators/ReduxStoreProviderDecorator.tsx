import React from 'react';
import {Provider} from 'react-redux';
import {AppStateType} from '../../state/store';
import {combineReducers, createStore} from 'redux';
import {v1} from 'uuid';
import {taskReducer} from '../../state/taskReducer';
import {todolistReducer} from '../../state/todolistReducer';

const rootReducer = combineReducers({
    task: taskReducer,
    todolist: todolistReducer
})

const initialGlobalState = {
    todolist: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    task: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
)