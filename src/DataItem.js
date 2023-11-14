import style from "./DataItem.module.css";

export const DataItem = (props) => {
  const deleteItemHandler = () => {
    const deletedItemId = props.id;
    props.onDeleteClick(deletedItemId);
  };

  const makeItemDoneHandler = () => {
    const doneId = props.id;
    props.onClickDoneTask(doneId);
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
          onClick={() => props.onClickImportantTask(props.id)}
        >
          !
        </button>
      </div>
    </li>
  );
};
