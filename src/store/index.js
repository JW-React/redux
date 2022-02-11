import { createStore } from "redux";

const status = {
  ADD: 1,
  DELETE: 9,
};

export const addTodo = text => ({ type: status.ADD, text, id: Date.now() });
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
};

const store = createStore(reducer);

export default store;
