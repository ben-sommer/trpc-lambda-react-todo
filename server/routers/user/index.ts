import { router } from "../../trpc";
import addUser from "./addUser";
import getAllUsers from "./getAllUsers";
import getUser from "./getUser";

export const userRouter = router({
    addUser,
    getAllUsers,
    getUser,
});
