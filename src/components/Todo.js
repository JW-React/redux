import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTodo } from "../store";
const Todo = ({ id, text, onClick }) => {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button type="button" onClick={onClick}>Delete</button>
    </li>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(deleteTodo(ownProps.id)),
  }
}

export default connect(null, mapDispatchToProps)(Todo);
