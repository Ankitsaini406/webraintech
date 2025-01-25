import { clearProtected } from "@/store/middleware/protectedSlice";
import { AppDispatch, RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { authToken } = useSelector((state: RootState) => state.proteced);
    const pathname = usePathname();

    const protectedRoutes = ['/profile'];

    useEffect(() => {
        if (protectedRoutes.includes(pathname) && !authToken) {
            dispatch(clearProtected());
            router.push("/auth/students/login");
        }
    }, [authToken, dispatch, router, pathname]);

    return <>{children}</>;
}

export default ProtectedRoute;
