import { useEffect, useState, useContext } from "react";
import { Context } from "./App";
import star from "../assets/star.svg";
import starFilled from "../assets/starFilled.svg";
import "./task.css";

export default function Task({ task }) {
  const [done, setDone] = useState(false);
  const [mouse, setMouse] = useState(false);
  const [imgSrc, setImgSrc] = useState(star);
  const [important, setImportant] = useState(false);
  const [todo, setTodo, importantTodo, setImportantTodo, sortBy, setSortBy] =
    useContext(Context);

  function handleClickFavourite() {
    if (!important) {
      if (task.type == "important") {
        alert("it's already in the important section");
      } else {
        task.type = "important";
        setImgSrc(starFilled);
        setImportant(true);
        setImportantTodo((prev) => {
          return [task, ...prev];
        });
      }
    } else {
      task.type = "default";
      setImgSrc(star);
      setImportant(false);
      setImportantTodo((prev) => {
        const temp = prev.filter((x) => x.id != task.id);
        return temp;
      });
    }
  }

  function handleClickDelete() {
    setTodo((prev) => {
      const temp = prev.filter((x) => x.id != task.id);
      return temp;
    });

    setImportantTodo((prev) => {
      const temp = prev.filter((x) => x.id != task.id);
      return temp;
    });
  }

  return (
    <div
      className="task"
      onMouseEnter={() => setMouse(true)}
      onMouseLeave={() => setMouse(false)}
    >
      {mouse && (
        <button className="star-button" onClick={handleClickFavourite}>
          <img src={imgSrc} width={20} height={20} />
        </button>
      )}
      <div className="text">
        <p className={done ? "done" : undefined}>{task.task}</p>
      </div>
      <div className="buttons">
        <button className="trash button" onClick={handleClickDelete}>
          {" "}
          &#128465;{" "}
        </button>
        <button className="done button" onClick={() => setDone(!done)}>
          &#10004;
        </button>
      </div>
    </div>
  );
}
