import React, { useState } from "react";

export const Todos = ({ data, ...props }) => {
  const className = "todoTitle " + (data.completed ? "todo-completed" : "");
  const [value, setValue] = useState(data.todos);
  const [disable, setDisable] = useState(true);
  const edit = () => {
    setDisable(!disable);
    if (!disable) {
      props.editText(props.idx, value);
    }
  };

  return (
    <div className="mainContainer">
      <p className="trash" onClick={() => props.deleteTodo(props.idx)}>
        🗑️
      </p>

      <input
        value={value}
        className={className}
        onChange={(e) => setValue(e.target.value)}
        disabled={disable}
      ></input>
      <p className="pencil" onClick={edit}>
        ✏️
      </p>
      <input
        className="todoCheckBox"
        type="checkbox"
        checked={data.completed}
        onChange={() => props.edit(props.idx)}
      ></input>
    </div>
  );
};
