
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/jwt";
import { Users } from "@/utils/InitialState";
import { redirect } from "next/navigation";

export default async function Page() {

      const authToken = (await cookies()).get("authToken");
      let user: Users | null = null;
  
      if (authToken) {
          try {
              const decoded = decodeToken(authToken.value);
                  user = decoded as Users;

                  if (user.role !== "ADMIN" && user.role !== "TEACHER") {
                      return redirect("/auth/login");
                  }
          } catch (error) {
              console.error("Failed to decode token:", error);
          }
      }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome to the admin panel.</p>
    </div>
  );
}
