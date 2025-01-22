
export const enqueryInitialState = {
    name: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    message: "",
}

export interface Student {
    id: string;
    name: string;
    email: string;
    role: string;
    // Add other fields as required
}

export interface StudentUpdateData {
    name?: string;
    email?: string;
    phoneNumber?: string;
    fatherName?: string;
    course?: string;
}

export interface UpdatePassword {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface StudentAuthState {
    student: Student | null;
    token: string | null;
    error: string | null;
    loading: boolean;
}

export const authStudentInitialState: StudentAuthState = {
    student: null,
    token: null,
    error: null,
    loading: false,
};