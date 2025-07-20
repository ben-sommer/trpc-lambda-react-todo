import { User } from "@db/services/Todo/models/User";
import { publicProcedure } from "../../trpc";
import z from "zod";

type UserResponse = {
    userId: string;
    name: string;
};

export default publicProcedure
    .input(
        z.object({
            userId: z.string(),
        }),
    )
    .query(async (args) => {
        const userResponse = await User.get({
            userId: args.input.userId,
        }).go();

        return userResponse.data as UserResponse;
    });
