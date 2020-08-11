import React, { Component } from "react";
import Todo from "./Todo";

const TodoList = (props) => {
  return (
    <div className="todo-list">
      <div className="tasks-list">
        {props.todoList.map((task) => {
          <Todo toggleTask={props.toggleTask} key={task.id} task={task} />;
        })}
      </div>
      <button className="clear-btn" onCLick={props.clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
};

export default TodoList;
