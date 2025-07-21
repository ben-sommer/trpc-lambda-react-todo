import { getIsAuthenticated } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export default function Nav() {
    const { isLoading, data: isAuthenticated } = useQuery({
        queryFn: getIsAuthenticated,
        queryKey: ["isAuthenticated"],
    });

    return (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>
                {!isLoading && isAuthenticated ? (
                    <Link to="/logout" className="[&.active]:font-bold">
                        Logout
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="[&.active]:font-bold">
                            Login
                        </Link>
                        <Link to="/register" className="[&.active]:font-bold">
                            Register
                        </Link>
                    </>
                )}
            </div>
            <hr />
        </>
    );
}
