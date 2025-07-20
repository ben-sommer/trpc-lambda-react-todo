import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../../server";
import { config } from "./sst";

export const queryClient = new QueryClient();

const trpcClient = createTRPCClient<AppRouter>({
    links: [httpBatchLink({ url: config.trpcServerUrl })],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
    client: trpcClient,
    queryClient,
});
