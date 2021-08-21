import axios from 'axios';

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetResponseType = {
    totalCount: number
    error: string | null
    items: TaskType[]
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0d85af83-16ac-4d7b-a6d4-3f759e1bbd76'
    }
})

export const taskAPI = {
    getTask(todolistId: string) {
        return instance.get<GetResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}