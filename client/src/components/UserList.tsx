import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, trpc } from "../../utils/trpc";

export default function UserList() {
    const userQuery = useQuery(trpc.userList.queryOptions());
    const userCreator = useMutation(
        trpc.userCreate.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.userList.queryOptions());
            },
        }),
    );

    if (userQuery.isLoading) return <p>Loading...</p>;
    if (userQuery.isError) return <p>Error: {userQuery.error.message}</p>;

    const users = userQuery.data!;

    return (
        <div>
            <div>
                {users.map((user) => (
                    <p key={user.id}>{user.name}</p>
                ))}
            </div>
            <button onClick={() => userCreator.mutate({ name: "Frodo" })}>
                Create Frodo
            </button>
        </div>
    );
}
