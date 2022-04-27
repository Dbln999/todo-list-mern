import React, { useState, useEffect } from "react";
import { Todos } from "./Todos";
import { useHttp } from "../hooks/http.hook";
export const TodoPage = () => {
  const [todos, setTodos] = useState({ todo: "", completed: false });
  const [value, setValue] = useState("");
  const { request } = useHttp();
  const inpChange = (event) => {
    setTodos({ todo: event.target.value, completed: todos.completed });
    setValue(event.target.value);
  };

  const addTodoBtn = async () => {
    try {
      const data = await request("/api/todos/", "POST", { ...todos });
      setValue("");
    } catch (e) {}
  };

  const [getData, setGetData] = useState();

  useEffect(() => {
    const find = async () => {
      const data = await request("/api/todos/", "GET", null);
      setGetData(data);
    };
    find();
  }, [setGetData, request]);

  const edit = async (id) => {
    try {
      Object.keys(getData).map((data, idx) => {
        if (id === idx) {
          getData[idx].completed = !getData[idx].completed;
        }
      });
      return setGetData(
        await request(`/api/todos/${getData[id]._id}`, "PUT", {
          completed: getData[id].completed,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      return setGetData(
        await request(`/api/todos/${getData[id]._id}`, "DELETE", null)
      );
    } catch (error) {}
  };

  const editText = async (id, text) => {
    try {
      Object.keys(getData).map((data, idx) => {
        if (id === idx) {
          getData[idx].todos = !getData[idx].todos;
        }
      });
      return setGetData(
        await request(`/api/todos/${getData[id]._id}`, "PUT", {
          todos: text,
        })
      );
    } catch (error) {}
  };

  return (
    <div className="mainPageContainer">
      <h1>Your Todos</h1>
      <div className="todoContainer">
        <div className="btnsContainer">
          <input
            className="todoInput"
            value={value}
            placeholder="Enter your todo"
            onChange={inpChange}
          ></input>
          <button
            className="addTodoBtn"
            onClick={() => {
              addTodoBtn();
            }}
          >
            ADD
          </button>
        </div>
        <div className="todos">
          {getData?.length >= 1
            ? Object.keys(getData).map((data, idx) => (
                <Todos
                  data={getData[data]}
                  idx={idx}
                  key={idx}
                  edit={edit}
                  editText={editText}
                  deleteTodo={deleteTodo}
                ></Todos>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};
