import { router } from "../../trpc";
import addTodo from "./addTodo";
import deleteTodo from "./deleteTodo";
import getTodos from "./getTodos";
import updateTodo from "./updateTodo";

export const todoRouter = router({
    addTodo,
    deleteTodo,
    getTodos,
    updateTodo,
});
