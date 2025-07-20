type User = { id: string; name: string };

// Imaginary database
const users: User[] = [
    {
        name: "Ben",
        id: "1",
    },
];
export const db = {
    user: {
        findMany: async () => users,
        findById: async (id: string) => users.find((user) => user.id === id),
        create: async (data: { name: string }) => {
            const user = { id: String(users.length + 1), ...data };
            users.push(user);
            return user;
        },
    },
};
