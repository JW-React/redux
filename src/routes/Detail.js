import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Detail = ({ todos }) => {
  const { id } = useParams();

  const todo = todos.find(item => item.id === parseInt(id));
  return (
    <>
      <h1>Detail</h1>
      <div>{todo.text}</div>
      <Link to="/">Back</Link>
    </>
  );
}

const mapStateToProps = (state) => {
  return { todos: state };
};

export default connect(mapStateToProps)(Detail);
