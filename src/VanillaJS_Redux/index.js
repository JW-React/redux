/**
 * 리액트 사용이 필요할 경우 코멘트 아웃 제거
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
 */

import { createStore } from "redux";


// 1.
const add = document.querySelector('#add');
const minus = document.querySelector('#minus');
const number = document.querySelector('#span');
const countActionType = {
  ADD: 'ADD',
  MINUS: 'MINUS',
}
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case countActionType.ADD:
      return count + 1;
    case countActionType.MINUS:
      return count - 1;
    default:
      return count;
  }
};
const countStore = createStore(countModifier);
const updateCount = () => number.innerText = countStore.getState();
countStore.subscribe(updateCount);
const handleAdd = () => countStore.dispatch({ type: countActionType.ADD });
const handleMinus = () => countStore.dispatch({ type: countActionType.MINUS });

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);


// 2. Todo List
const todoActionType = {
  REGISTER: 'REGISTER',
  DONE: 'DONE',
};
const todoInput = document.querySelector('#todoInput');
const todoSubmit = document.querySelector('#todoSubmit');
const todoList = document.querySelector('#todoList');

const todoModifier = (list = [], action) => {
  switch (action.type) {
    case todoActionType.REGISTER:
      if (!action.text || action.text.length === 0) return list;
      return [{ text: action.text, id: action.id }, ...list];
    case todoActionType.DONE:
      return list.filter((item) => item.id !== action.id);
    default:
      return list;
  }
}

const todoStore = createStore(todoModifier);

const addTodo = text => todoStore.dispatch({ type: todoActionType.REGISTER, text: text, id: Date.now() });

const doneTodo = id => todoStore.dispatch({ type: todoActionType.DONE, id });

const updateTodoList = () => {
  todoInput.value = '';
  todoList.innerHTML = '';
  const list = todoStore.getState();
  list.forEach((item) => {
    const doneBtn = document.createElement('button');
    doneBtn.innerText = 'Done';
    doneBtn.addEventListener('click', () => doneTodo(item.id));

    const li = document.createElement('li');
    li.innerText = item.text;
    li.id = item.id;
    li.appendChild(doneBtn);
    todoList.appendChild(li);
  });

}
todoStore.subscribe(updateTodoList);



todoSubmit.addEventListener('click', () => addTodo(todoInput.value));
