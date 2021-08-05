import React from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";

const task1: TaskType[] = [
    {id: 1, title: "JS", isDone: false},
    {id: 2, title: "TS", isDone: true},
    {id: 3, title: "React", isDone: true}
]

const task2: TaskType[] = [
    {id: 1, title: "Bread", isDone: false},
    {id: 2, title: "Milk", isDone: true},
    {id: 3, title: "Tea", isDone: true}
]

function App() {
    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={task1}
            />
            <Todolist
                title={"What to buy"}
                tasks={task2}
            />
        </div>
    );
}

export default App;


