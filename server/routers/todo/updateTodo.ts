import { publicProcedure } from "../../trpc";
import z from "zod";
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
            todoId: z.string(),
            createdAt: z.string(),
            completed: z.boolean(),
        }),
    )
    .mutation(async (args) => {
        const updateTodoResponse = await Todo.update({
            userId: args.ctx.user.userId,
            createdAt: args.input.createdAt,
            todoId: args.input.todoId,
        })
            .set({
                completed: args.input.completed,
            })
            .go({
                response: "all_new",
            });

        return updateTodoResponse.data as TodoResponse;
    });
