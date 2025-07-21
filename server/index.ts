import { router } from "./trpc";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { userRouter } from "./routers/user";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

const appRouter = router({
    user: userRouter,
});

export const handler = (event: APIGatewayProxyEvent) =>
    awsLambdaRequestHandler({
        router: appRouter,
        // createContext: (opts) => {
        //     if (!("authorizer" in opts.event.requestContext))
        //         throw new Error("Authorizer not present in request!");

        //     const user = opts.event.requestContext.authorizer;

        //     return { ...opts, user };
        // },
    });

export type AppRouter = typeof appRouter;
