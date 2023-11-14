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
        // onDeleteItem={() => console.log("onDeleteItem")}
        // onChangeImportantTask={changeImportantTaskHandler}
        // onChangeImportantTask={() => console.log("onChangeImportantTask")}
        // onChangeDoneTask={changeDoneTaskHandler}
        onChangeDoneTask={() => console.log("onChangeDoneTask")}
      />

      <Form
        // onAddNewData={changeDataHandler}
        onAddNewData={() => console.log("changeDataHandler")}
      />
    </div>
  );
}

export default App;
