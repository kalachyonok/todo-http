import { Header } from "./components/Header";
import { Form } from "./components/Form";
import style from "./App.module.css";
import { useState } from "react";
import { useGetTodos } from "./useGetTodos";
import { DataList } from "./components/DataList";
import { Filter } from "./components/Filter";

function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const { isLoading, error, data, refetch } = useGetTodos();

  const filteredData = (tagFilter) => {
    if (tagFilter === "all") {
      return data;
    }
    if (tagFilter === "active") {
      return data.filter((item) => item.isDone === false);
    }
    if (tagFilter === "done") {
      return data.filter((item) => item.isDone === true);
    }
  };
  const filteredDataState = filteredData(activeFilter);

  const filteredDataByInputValue = (searchValue) => {
    return filteredDataState.filter((item) =>
      item.taskTitle.toLowerCase().includes(searchValue.toLowerCase())
    );
  };
  const filteredDataStateByInputValue = filteredDataByInputValue(inputValue);

  const doneTaskCount = data.reduce((sum, current) => {
    return current.isDone ? sum + 1 : sum + 0;
  }, 0);

  const totalToDoTask = data.length - doneTaskCount;

  const deleteItemHandler = async (id) => {
    await fetch(
      `https://http-todo-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
      {
        method: "DELETE",
      }
    );

    refetch();
  };

  const changeDataHandler = async (newTask) => {
    await fetch(
      "https://http-todo-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      }
    );
    refetch();
  };

  const changeImportantTaskHandler = async (id, nextImportantStatus) => {
    // let state = false;

    await fetch(
      `https://http-todo-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isImportant: nextImportantStatus }),
      }
    );

    refetch();
  };

  return (
    <div className={style.wrap}>
      <Header doneTaskCount={doneTaskCount} totalToDoTask={totalToDoTask} />
      <Filter
        inputValue={inputValue}
        setInputValue={setInputValue}
        changeState={setActiveFilter}
        activeFilter={activeFilter}
      />

      {!isLoading && !error && data.length === 0 && <p>Задач не найдено</p>}
      {isLoading && <p>идет загрузка...</p>}
      {error && <p>{error}</p>}

      <DataList
        data={filteredDataStateByInputValue}
        onDeleteItem={deleteItemHandler}
        onChangeImportantTask={changeImportantTaskHandler}
        // onChangeDoneTask={changeDoneTaskHandler}
        // onChangeDoneTask={() => console.log("onChangeDoneTask")}
      />

      <Form onAddNewData={changeDataHandler} />
    </div>
  );
}

export default App;
