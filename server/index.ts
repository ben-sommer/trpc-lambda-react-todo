import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { db } from "./db";
import { publicProcedure, router } from "./trpc";
import cors from "cors";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

const appRouter = router({
    userList: publicProcedure.query(async () => {
        const users = await db.user.findMany();
        return users;
    }),
    userById: publicProcedure.input(z.string()).query(async (opts) => {
        const { input } = opts;
        const user = await db.user.findById(input);
        return user;
    }),
    userCreate: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async (opts) => {
            const { input } = opts;
            const user = await db.user.create(input);
            return user;
        }),
});

export const handler = awsLambdaRequestHandler({
    router: appRouter,
    createContext: (opts) => opts,
});

export type AppRouter = typeof appRouter;
