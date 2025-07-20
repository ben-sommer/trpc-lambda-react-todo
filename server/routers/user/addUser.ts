import { User } from "@db/services/Todo/models/User";
import { publicProcedure } from "../../trpc";
import z from "zod";
import { userRouter } from ".";
import { EntityItem } from "electrodb";

export default publicProcedure
    .input(
        z.object({
            name: z.string(),
        }),
    )
    .mutation(async (args) => {
        const newUser: EntityItem<typeof User> = {
            userId: crypto.randomUUID(),
            name: args.input.name,
        };

        await User.create(newUser).go();

        return newUser;
    });
