# Redux 공부

### 패키지 관리자 yarn 사용

하단의 코드는 `package-lock.json` 파일로부터 `yarn.lock` 파일을 생성하는 코드이다.

```sh
yarn import
```

## 여기부터는 Vanilla JS + Redux

### 리덕스 설치

```sh
yarn add redux
```

### 소스 코드

```js
import { createStore } from "redux";

const ADD = "ADD";
const MINUS = "MINUS";

/**
 * state는 리덕스로 관리하고자 하는 데이터
 * action은 리덕스에 적용하고자 하는 데이터로 type이 필수 값.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    case MINUS:
      return state - 1;
    default:
      return state;
  }
};
const store = createStore(reducer);
const onStateChange = () => {
  const state = store.getState();
  // 각종 처리
};
/**
 * reducer가 실행되는 것(state가 변경되는 것)을 감지 
 */
store.subscribe(onStateChange);

const handlePlusBtn = () => store.dispatch({ type: ADD });
document.getElementById("plusBtn").addEventListener("click", handlePlusBtn);

const handleMinusBtn = () => store.dispatch({ type: MINUS });
document.getElementById("minusBtn").addEventListener("click", handleMinusBtn);
```

## 여기부터는 React + Redux

### 소스 코드

```js
// store/index.js
import { createStore } from "redux";
const status = { ADD: 1, DELETE: 9 };
export const addTodo = text => ({ type: status.ADD, id: Date.now(), text });
export const deleteTodo = id => ({ type: status.DELETE, id });
const reducer = (state = [], action) => {
  switch (action.type) {
    case status.ADD:
      const todo = { text: action.text, id: action.id };
      return [todo, ...state];
    case status.DELETE:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}
const store = createStore(reducer);
export default store;


// Home.js
import React, { useState } from "react";
import { connect } from "react-redux";
import Todo from "../components/Todo";
import { addTodo, deleteTodo } from "../store";

const Home = ({ todos, add }) => {
  const [text, setText] = useState("");
  const textOnChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    add(text);
    setText("");
  };

  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={textOnChange} />
        <button type="submit">Register</button>
      </form>
      <ul>
        {todos.map(todo =>
          <Todo key={todo.id} {...todo} />
        )}
      </ul>
    </>
  );
};

const mapStateToProps = state => ({ todos: state });
const mapDispatchToProps = dispatch => ({ add: text => dispatch(addTodo(text)) });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```
