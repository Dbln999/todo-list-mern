import React from "react";
//import { MainPage } from "./pages/MainPage.js";
import { TodoPage } from "./pages/TodoPage.js";
import { Routes, Route, Navigate } from "react-router-dom";

export const useRoutes = (isNicknamed) => {
  // if (isNicknamed) {
  //   <Routes>
  //     <Route path="/mytodos" exact element={<TodoPage></TodoPage>}></Route>
  //     <Route path="*" element={<Navigate replace to="/"></Navigate>}></Route>
  //   </Routes>;
  // }
  return (
    <Routes>
      <Route path="/" exact element={<TodoPage></TodoPage>}></Route>
      <Route path="*" element={<Navigate replace to="/"></Navigate>}></Route>
    </Routes>
  );
};
