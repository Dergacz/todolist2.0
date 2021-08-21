import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from '../components/Task/Task';
import {TaskPriorities, TaskStatuses} from '../api/tasksApi';


export default {
    title: 'Todolists/Task',
    component: Task
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task');
const changeTaskTitleCallback = action('Title changed inside Task');
const removeTaskStatusCallback = action('Remove button inside Task clicked');

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskStatusCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {
        id: '1',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        completed: true,
        addedDate: '',
        description: ''
        , title: 'JS'
    },
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {
        id: '1',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        completed: true,
        addedDate: '',
        description: '',
        title: 'JS'
    },
    todolistId: 'todolistId1'
}

