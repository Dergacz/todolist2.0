import React from 'react';
import {Provider} from 'react-redux';
import {AppStateType} from '../../state/store';
import {combineReducers, createStore} from 'redux';
import {v1} from 'uuid';
import {taskReducer} from '../../state/taskReducer';
import {todolistReducer} from '../../state/todolistReducer';
import {TaskPriorities, TaskStatuses} from '../../api/tasksApi';

const rootReducer = combineReducers({
    task: taskReducer,
    todolist: todolistReducer
})

const initialGlobalState = {
    todolist: [
        {
            id: 'todolistId1',
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: 'todolistId2',
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0
        }
    ],
    task: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: false,
                addedDate: '',
                description: ''

            },
            {
                id: v1(),
                title: 'JS',
                isDone: true,
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true,
                addedDate: '',
                description: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
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
                title: 'React Book',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true,
                addedDate: '',
                description: ''

            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
)