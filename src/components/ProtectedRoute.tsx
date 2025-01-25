import { clearProtected, setAuthToken } from "@/store/middleware/protectedSlice";
import { AppDispatch, RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { authToken } = useSelector((state: RootState) => state.proteced);
    const pathname = usePathname();

    const protectedRoutes = ['/profile'];

    useEffect(() => {
        const fetchToken = async () => {
            const tokenFromCookie = getCookie("authToken");

            if (tokenFromCookie && tokenFromCookie !== authToken) {
                dispatch(setAuthToken(tokenFromCookie as string));
            }

            if (protectedRoutes.includes(pathname)) {
                if (!authToken && !tokenFromCookie) {
                    dispatch(clearProtected());
                    router.push("/auth/students/login");
                }
            }
        };

        fetchToken();
    }, [authToken, dispatch, router, pathname]);

    return <>{children}</>;
}

export default ProtectedRoute;
