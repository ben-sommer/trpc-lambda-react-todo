import { router } from "./trpc";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { userRouter } from "./routers/user";

const appRouter = router({
    user: userRouter,
});

export const handler = awsLambdaRequestHandler({
    router: appRouter,
    createContext: (opts) => opts,
});

export type AppRouter = typeof appRouter;
