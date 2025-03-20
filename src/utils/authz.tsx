
type Role = "STUDENT" | "TEACHER" | "ADMIN";
type Action = "view" | "create" | "edit" | "delete";

const PERMISSIONS: Record<Role, Action[]> = {
    ADMIN: ["view", "create", "edit", "delete"],
    TEACHER: ["view", "create", "edit"],
    STUDENT: ["view"],
};

export const checkPermission = (user: { role: string }, action: Action): boolean => {
    const role = user.role.toLowerCase() as Role;
    
    if (!(role in PERMISSIONS)) {
        console.warn(`Invalid role: ${user.role}`);
        return false;
    }

    return PERMISSIONS[role].includes(action);
}

export default checkPermission;