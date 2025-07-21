import { router } from "./trpc";
import {
    awsLambdaRequestHandler,
    CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import { userRouter } from "./routers/user";
import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";

const appRouter = router({
    user: userRouter,
});

export const handler = awsLambdaRequestHandler({
    router: appRouter,
    createContext: ({
        event,
        context,
        info,
    }: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2WithJWTAuthorizer>) => {
        if (!("authorizer" in event.requestContext))
            throw new Error("Authorizer not present in request!");

        const user = event.requestContext.authorizer;

        return {
            event,
            context,
            info,
            user: {
                email: user.jwt.claims.email as string,
                userId: user.jwt.claims.sub as string,
            },
        };
    },
});

export const options = () => ({
    statusCode: 204,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
    },
});

export type AppRouter = typeof appRouter;
