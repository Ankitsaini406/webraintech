import { cookies } from "next/headers";
import { decodeToken } from "@/utils/jwt";
import { Users } from "@/utils/InitialState";
import { ProfileComponent } from "./ProfileComponent";

export default async function Page() {
    // Get the token from cookies
    const authToken = (await cookies()).get("authToken");

    let user: Users | null = null;

    if (authToken) {
        try {
            const decoded = decodeToken(authToken.value);
                user = decoded as Users;
        } catch (error) {
            console.error("Failed to decode token:", error);
        }
    }

    return (
        <ProfileComponent
            user={user || null}
        />
    );
}
