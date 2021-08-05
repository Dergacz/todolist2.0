import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "JS", isDone: false},
        {id: 2, title: "TS", isDone: true},
        {id: 3, title: "React", isDone: true}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTask = (taskId: number) => {
        const filteredTask = tasks.filter(t => taskId !== t.id);
        setTasks(filteredTask)
    }

    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;


