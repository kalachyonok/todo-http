import { DataItem } from "../DataItem";

export const DataList = (props) => {
  return (
    <ul className="list-group todo-list">
      {props.data.map((task) => {
        return (
          <DataItem
            title={task.title}
            key={task.id}
            id={task.id}
            isImportant={task.isImportant}
            isDone={task.isDone}
            onDeleteClick={props.onDeleteItem}
            changeStatusTaskHandler={props.changeStatusTaskHandler}
          />
        );
      })}
    </ul>
  );
};
