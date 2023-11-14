import { Header } from "./components/Header";
import { Form } from "./components/Form";
import style from "./App.module.css";
import { useCallback, useState, useEffect } from "react";
import { DataList } from "./components/DataList";
import { Filter } from "./components/Filter";

const modifyData = (obj) => {
  console.log("modifyData  obj:", obj);
  const arrOfData = [];

  for (const objKey in obj) {
    arrOfData.push({
      id: objKey,
      isDone: obj[objKey].isDone,
      isImportant: obj[objKey].isImportant,
      taskTitle: obj[objKey].taskTitle,
    });
  }
  console.log("modifyData  arrOfData:", arrOfData);

  return arrOfData;
};

function App() {
  const [dataState, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const changeDataHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(
        "https://http-todo-default-rtdb.europe-west1.firebasedatabase.app/todos.json"
      );
      if (!response.ok) {
        throw new Error("Ошибка запроса.");
      }
      const data = await response.json();
      console.log("changeDataHandler  data:", data);

      const newData = modifyData(data);
      console.log("changeDataHandler  newData:", newData);

      setData(newData);
    } catch (err) {
      setError(err.message || "Что-то пошло не так...");
    }
  }, []);

  useEffect(() => {
    changeDataHandler();
  }, [changeDataHandler]);

  // const deleteItemHandler = (delitedItemId) => {
  //   const indexDelitItem = dataState.findIndex(
  //     (task) => task.id === delitedItemId
  //   );

  //   const changedData = [...dataState];
  //   changedData.splice(indexDelitItem, 1);
  //   setData(changedData);
  // };

  // const changeImportantTaskHandler = (importantID) => {
  //   const indexImportantItem = dataState.findIndex(
  //     (task) => task.id === importantID
  //   );

  //   const targetTAsk = dataState[indexImportantItem];
  //   const updatedImportantTask = {
  //     ...targetTAsk,
  //     isImportant: !targetTAsk.isImportant,
  //   };

  //   const changedData = [...dataState];
  //   changedData.splice(indexImportantItem, 1, updatedImportantTask);
  //   setData(changedData);
  // };

  // const changeDoneTaskHandler = (doneId) => {
  //   const indexDoneItem = dataState.findIndex((task) => task.id === doneId);

  //   const targetTAsk = dataState[indexDoneItem];
  //   const updatedDoneTask = {
  //     ...targetTAsk,
  //     isDone: !targetTAsk.isDone,
  //   };

  //   const changedData = [...dataState];
  //   changedData.splice(indexDoneItem, 1, updatedDoneTask);
  //   setData(changedData);
  // };

  // const doneTaskCount = dataState.reduce((sum, current) => {
  //   return current.isDone ? sum + 1 : sum + 0;
  // }, 0);

  // const totalToDoTask = dataState.length - doneTaskCount;

  const filteredData = (tagFilter) => {
    if (tagFilter === "all") {
      return dataState;
    }
    if (tagFilter === "active") {
      return dataState.filter((item) => item.isDone === false);
    }
    if (tagFilter === "done") {
      return dataState.filter((item) => item.isDone === true);
    }
  };
  const filteredDataState = filteredData(activeFilter);

  const filteredDataByInputValue = (searchValue) => {
    return filteredDataState.filter((item) =>
      item.taskTitle.toLowerCase().includes(searchValue.toLowerCase())
    );
  };
  const filteredDataStateByInputValue = filteredDataByInputValue(inputValue);

  return (
    <div className={style.wrap}>
      {/* <Header doneTaskCount={doneTaskCount} totalToDoTask={totalToDoTask} /> */}
      {/* <Filter
        inputValue={inputValue}
        setInputValue={setInputValue}
        changeState={setActiveFilter}
        activeFilter={activeFilter}
      /> */}
      <DataList
        data={dataState}
        // onDeleteItem={deleteItemHandler}
        onDeleteItem={() => console.log("onDeleteItem")}
        // onChangeImportantTask={changeImportantTaskHandler}
        onChangeImportantTask={() => console.log("onChangeImportantTask")}
        // onChangeDoneTask={changeDoneTaskHandler}
        onChangeDoneTask={() => console.log("onChangeDoneTask")}
      />
      <Form onAddNewData={changeDataHandler} />
    </div>
  );
}

export default App;
