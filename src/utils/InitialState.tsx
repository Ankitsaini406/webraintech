
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

export interface UserUpdateData {
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

export interface UsersAuthState {
    user: Users | null;
    token: string | null;
    error: string | null;
    loading: boolean;
}

export const authUserInitialState: UsersAuthState = {
    user: null,
    token: null,
    error: null,
    loading: false,
};

export interface Student {
    name: string;
    email: string;
    course: string[];
    phoneNumber: string;
    fatherName: string;
    motherName: string;
    alternativeNumber: string;
    aadhaarNumber: string;
    dob: Date | null;
    role: 'STUDENT',
    address: string;
    password: string;
    confirmPassword: string;
}

export interface Teachers {
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
    details: string;
    brief: string;
    facebook: string;
    instagram: string;
    linkdin: string;
    youtube: string;
    x: string;
    updateAt: Date;
    createdAt: Date;
    // Add other fields as required
}