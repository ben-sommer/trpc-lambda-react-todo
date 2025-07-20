// import * as sst from 'sst';

/// <reference path=".sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: "trpc-lambda-react-todo",
            home: "aws",
            removal: input?.stage === "production" ? "retain" : "remove",
            providers: {
                aws: {
                    profile: "personal",
                },
            },
        };
    },
    async run() {
        const todoTable = new sst.aws.Dynamo("Todo", {
            fields: {
                userId: "string",
            },
            primaryIndex: {
                hashKey: "userId",
            },
        });

        const server = new sst.aws.Function("TrpcServer", {
            url: true,
            handler: "server/index.handler",
            link: [todoTable],
        });

        const client = new sst.aws.StaticSite("ViteClient", {
            environment: {
                VITE_TRPC_SERVER_URL: server.url,
            },
            build: {
                command: "npm run build:client",
                output: "dist",
            },
        });

        return {};
    },
});
