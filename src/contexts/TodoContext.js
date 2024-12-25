import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [],
    addTodo: (newTodo) => { },
    removeTodo: (id) => { },
    toggleTodo: (id) => { },
    editTodo: (id) => { }
})

export const TodoContextProvider = TodoContext.Provider

export function useTodoContext() {
    return useContext(TodoContext)
}