import { UserUpdateData, UpdatePassword, Users, authUserInitialState } from "@/utils/InitialState";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";

// Login Student
export const loginUser = createAsyncThunk(
    "authUser/login",
    async (
        { role, credentials }: { role: "student" | "teacher"; credentials: { email: string; password: string } },
        { rejectWithValue }
    ) => {
        try {
            const endpoint = role === "student" ? "/api/students/login" : "/api/teachers/login";
            const response = await axios.post(endpoint, credentials);
            return { role, ...response.data };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Login failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);


// Register Student
export const registerUser = createAsyncThunk(
    "authUser/register",
    async (
        { role, userData }: { role: "student" | "teacher"; userData: Users },
        { rejectWithValue }
    ) => {
        try {
            const endpoint = role === "student" ? "/api/students/register" : "/api/teachers/register";
            const response = await axios.post(endpoint, userData);
            return { role, ...response.data };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Registration failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

// Update Student
export const updateUser = createAsyncThunk(
    "authUser/update",
    async ({ role, id, updateData }: { role: "student" | "teacher"; id: string, updateData: UserUpdateData }, { rejectWithValue }) => {
        try {
            const endpoint = role === "student" ? `/api/students/register/${id}` : `/api/teachers/register/${id}`;
            const response = await axios.put(endpoint, updateData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Update failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

// Update Password
export const updatePassword = createAsyncThunk(
    "authUser/updatePassword",
    async ({ role, id, passwordData }: { role: "student" | "teacher"; id: string, passwordData: UpdatePassword }, { rejectWithValue }) => {
        try {
            const endpoint = role === "student" ? `/api/students/register/${id}/password` : `/api/teachers/register/${id}/password`;
            const response = await axios.put(endpoint, passwordData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Update passowrd failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

// Delete Student
export const deleteStudent = createAsyncThunk(
    "authUser/delete",
    async ({ role, id}: { role: "student" | "teacher"; id: string,}, { rejectWithValue }) => {
        try {
            const endpoint = role === "student" ? `/api/students/${id}` : `/api/teachers/${id}`;
            const response = await axios.delete(endpoint);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Delete failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: authUserInitialState,
    reducers: {
        logoutStudent(state) {
            state.user = null;
            state.token = null;
            deleteCookie("authToken");
            localStorage.removeItem("authToken");
        },
        setUser(state, action: PayloadAction<Users>) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

        // Login Student
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.users;
            state.token = action.payload.token;
            setCookie("authToken", action.payload.token, { maxAge: 60 * 60 * 24 * 7 });
            localStorage.setItem("authToken", action.payload.token);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Register Student
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.users;
            state.token = action.payload.token;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update Student
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = {...state.user, ...action.payload};
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update Password
        .addCase(updatePassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updatePassword.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
});

export const { logoutStudent, setUser } = userSlice.actions;
export default userSlice.reducer;