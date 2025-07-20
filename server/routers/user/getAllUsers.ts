import { User } from "@db/services/Todo/models/User";
import { publicProcedure } from "../../trpc";
import { EntityItem } from "electrodb";

type UserResponse = {
    userId: string;
    name: string;
};

export default publicProcedure.query(async () => {
    const usersResponse = await User.scan.go();

    return usersResponse.data.map(({ userId, name }) => ({
        userId,
        name,
    })) as UserResponse[];
});
