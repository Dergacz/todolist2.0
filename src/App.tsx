import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {
            id: todolistId1,
            title: "What to buy",
            filter: "all"
        },
        {
            id: todolistId2,
            title: "What to learn",
            filter: "all"
        }
    ]);

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "TS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Tea", isDone: true}
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId);
        setTasks({...tasks});
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    const addTask = (taskTitle: string, todolistId: string) => {
        const task: TaskType = {id: v1(), title: taskTitle, isDone: false}
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId];
        const task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks});
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: "all"}
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        });
    }

    const changeTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId];
        const task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    const allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;
                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;


