import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "TS", isDone: true},
        {id: v1(), title: "React", isDone: true}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTask = (taskId: string) => {
        const filteredTask = tasks.filter(t => taskId !== t.id);
        setTasks(filteredTask)
    }

    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTask = (taskTitle: string) => {
        const task: TaskType = {id: v1(), title: taskTitle, isDone: false}
        const newTask = [task, ...tasks];
        setTasks(newTask)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;


