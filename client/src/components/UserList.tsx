import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, trpc } from "../../utils/trpc";

export default function UserList() {
    const usersQuery = useQuery(trpc.user.getAllUsers.queryOptions());
    const userCreator = useMutation(
        trpc.user.addUser.mutationOptions({
            onSuccess: (data) => {
                queryClient.invalidateQueries(
                    trpc.user.getAllUsers.queryOptions(),
                );
                queryClient.invalidateQueries(
                    trpc.user.getUser.queryFilter({
                        userId: data.userId,
                    }),
                );
            },
        }),
    );

    if (usersQuery.isLoading) return <p>Loading...</p>;
    if (usersQuery.isError) return <p>Error: {usersQuery.error.message}</p>;

    const users = usersQuery.data!;

    return (
        <div>
            <div>
                {users.map((user) => (
                    <p key={user.userId}>{user.name}</p>
                ))}
            </div>
            <button
                onClick={() =>
                    userCreator.mutate({
                        name: "Frodo",
                    })
                }
            >
                Create Frodo
            </button>
            {usersQuery.isRefetching && <p>Refetching...</p>}
        </div>
    );
}
