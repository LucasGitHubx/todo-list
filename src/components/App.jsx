import { useState, createContext } from "react";
import Form from "./Form";
import "./app.css";
import Task from "./Task";

export const Context = createContext();

export default function App() {
  const [todo, setTodo] = useState([]);
  const [importantTodo, setImportantTodo] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  function handleClickDone(task, setDone) {
    task.done = !task.done;

    if (!task.done) {
      setDone(false);
    } else {
      setDone(true);
    }
  }

  return (
    <div className="container">
      <Context.Provider
        value={[
          todo,
          setTodo,
          importantTodo,
          setImportantTodo,
          sortBy,
          setSortBy,
        ]}
      >
        <Form />
        <div className="content">
          {todo.length == 0 ? (
            <h1>You do not have tasks yet</h1>
          ) : sortBy == "default" ? (
            todo.map((task) => {
              return (
                <Task key={task.id} task={task} setTaskDone={handleClickDone} />
              );
            })
          ) : importantTodo.length == 0 ? (
            <h1>No important tasks yet</h1>
          ) : (
            importantTodo.map((task) => {
              return (
                <Task key={task.id} task={task} setTaskDone={handleClickDone} />
              );
            })
          )}
        </div>
      </Context.Provider>
    </div>
  );
}
