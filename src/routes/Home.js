import React, { useState } from "react";
import { connect } from "react-redux";
import Todo from "../components/Todo";
import { addTodo } from "../store";

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
}

const mapStateToProps = state => ({ todos: state });
const mapDispatchToProps = dispatch => ({ add: text => dispatch(addTodo(text)) });


export default connect(mapStateToProps, mapDispatchToProps)(Home);
