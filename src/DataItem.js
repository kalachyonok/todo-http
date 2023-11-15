import style from "./DataItem.module.css";

export const DataItem = (props) => {
  const deleteItemHandler = () => {
    const deletedItemId = props.id;
    props.onDeleteClick(deletedItemId);
  };

  const nextImportantTaskStatus = {
    isDone: props.isDone,
    isImportant: !props.isImportant,
    title: props.title,
  };

  const nextDoneTaskStatus = {
    isDone: !props.isDone,
    isImportant: props.isImportant,
    title: props.title,
  };

  const makeItemDoneHandler = () => {
    props.changeStatusTaskHandler(props.id, nextDoneTaskStatus);
  };

  const importantStyle = props.isImportant ? style.important : "";
  const doneStyle = props.isDone ? style.done : "";

  return (
    <li className={`list-group-item ${style.li}`}>
      <div
        className={`${style.title} ${doneStyle} ${importantStyle}`}
        onClick={makeItemDoneHandler}
      >
        {props.title}
      </div>
      <div className={style["btn-set"]}>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={deleteItemHandler}
        >
          DEL
        </button>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() =>
            props.changeStatusTaskHandler(props.id, nextImportantTaskStatus)
          }
        >
          !
        </button>
      </div>
    </li>
  );
};
