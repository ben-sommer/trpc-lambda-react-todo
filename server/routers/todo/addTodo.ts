import { publicProcedure } from "../../trpc";
import z from "zod";
import { EntityItem } from "electrodb";
import { Todo } from "@db/services/Todo/models/Todo";

type TodoResponse = {
    userId: string;
    todoId: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
};

export default publicProcedure
    .input(
        z.object({
            title: z.string(),
        }),
    )
    .mutation(async (args) => {
        const newTodo = await Todo.create({
            userId: args.ctx.user.userId,
            todoId: crypto.randomUUID(),
            title: args.input.title,
            completed: false,
        }).go();

        return newTodo.data as TodoResponse;
    });
