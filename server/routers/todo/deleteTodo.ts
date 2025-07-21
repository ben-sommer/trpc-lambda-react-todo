import { publicProcedure } from "../../trpc";
import z from "zod";
import { Todo } from "@db/services/Todo/models/Todo";

export default publicProcedure
    .input(
        z.object({
            todoId: z.string(),
            createdAt: z.string(),
        }),
    )
    .mutation(async (args) => {
        await Todo.delete({
            userId: args.ctx.user.userId,
            todoId: args.input.todoId,
            createdAt: args.input.createdAt,
        }).go();

        return null;
    });
