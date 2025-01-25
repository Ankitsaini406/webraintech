
export const enqueryInitialState = {
    name: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    message: "",
}

export interface Users {
    id: string;
    name: string;
    email: string;
    course: string[];
    phoneNumber: string;
    fatherName: string;
    motherName: string;
    alternativeNumber: string;
    aadhaarNumber: string;
    dob: Date;
    address: string;
    password: string;
    role: string;
    updateAt: Date;
    createdAt: Date;
    // Add other fields as required
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