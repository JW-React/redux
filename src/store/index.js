import { configureStore, createSlice } from "@reduxjs/toolkit";

const todo = createSlice({
  name: 'todosReducer',
  initialState: [],
  reducers: {
    addTodo: (state, action) => [{ text: action.payload, id: Date.now() }, ...state],
    deleteTodo: (state, action) => state.filter(todo => todo.id !== action.payload),
  }
});

export const { addTodo, deleteTodo } = todo.actions;
export default configureStore({ reducer: todo.reducer });
