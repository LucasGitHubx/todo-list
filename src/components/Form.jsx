import { useContext, useEffect, useState } from "react";
import { Context } from "./App";
import "./form.css";

export default function Form() {
  const [todo, setTodo, importantTodo, setImportantTodo, sortBy, setSortBy] =
    useContext(Context);
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);

  function handleChangeSelect(e) {
    setSortBy(e.target.value);
  }

  function handleChangeInput(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() == "") {
      setValid(true);
    } else {
      setValid(false);
      setTodo((prev) => {
        return [
          { id: crypto.randomUUID(), task: value, type: "default" },
          ...prev,
        ];
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="value" className={valid ? "not-valid-value" : "valid"}>
        You must enter a task
      </label>
      <input type="text" onChange={handleChangeInput} id="value" />
      <button>Enter</button>
      <select name="sort" id="sort" onChange={handleChangeSelect}>
        <option value="default">Default</option>
        <option value="important">Important</option>
      </select>
    </form>
  );
}
