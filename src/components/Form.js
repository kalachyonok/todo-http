import style from "./Form.module.css";
import { useState, memo } from "react";

export const Form = memo((props) => {
  const [inputName, setInputName] = useState("");

  const changeHandler = (event) => {
    setInputName(event.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();

    const newTask = {
      taskTitle: inputName,
      id: Math.random().toString(),
      isImportant: false,
      isDone: false,
    };

    props.onAddNewData(newTask);

    setInputName("");
  };

  return (
    <form className={style.form}>
      <input
        className={`form-control ${style.input}`}
        type="text"
        placeholder="What needs to be Done"
        onChange={changeHandler}
        value={inputName}
      />
      <button className="btn btn-outline-secondary" onClick={onClick}>
        Add
      </button>
    </form>
  );
});
