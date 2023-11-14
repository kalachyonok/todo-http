import style from "./Header.module.css";
import { memo } from "react";

export const Header = memo(({ doneTaskCount, totalToDoTask }) => {
  return (
    <div className={style.header}>
      <h1 className={style["header-name"]}>Todo List</h1>
      <div>
        {totalToDoTask} more to do, {doneTaskCount} done
      </div>
    </div>
  );
});
