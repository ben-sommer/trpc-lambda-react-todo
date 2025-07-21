import { Todo } from "@db/services/Todo/models/Todo";
import { publicProcedure } from "../../trpc";

type TodoResponse = {
    userId: string;
    todoId: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
};

export default publicProcedure.query(async (args) => {
    const userResponse = await Todo.query
        .todoByUser({
            userId: args.ctx.user.userId,
        })
        .go();

    return userResponse.data as TodoResponse[];
});
