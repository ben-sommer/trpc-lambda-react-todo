import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/trpc";
import UserList from "./components/UserList";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserList />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
