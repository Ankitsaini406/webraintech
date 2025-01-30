import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserUpdateData, UpdatePassword, Users, authUserInitialState } from "@/utils/InitialState";

// Login User
export const loginUser = createAsyncThunk(
    "users/login",
    async (
        { credentials }: { credentials: { email: string; password: string } },
        { rejectWithValue }
    ) => {
        try {
            const endpoint = "/api/users/login";
            const response = await axios.post(endpoint, credentials);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Login failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

// Register User
export const registerUser = createAsyncThunk(
    "users/register",
    async (
        { userData }: { userData: Users },
        { rejectWithValue }
    ) => {
        try {
            const endpoint = "/api/users/register";
            const response = await axios.post(endpoint, userData);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Registration failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

// Update User
export const updateUser = createAsyncThunk(
    "users/update",
    async ({ id, updateData }: { id: string, updateData: UserUpdateData }, { rejectWithValue }) => {
        try {
            const endpoint = `/api/users/register/${id}`;
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

// Update User
export const updatePassword = createAsyncThunk(
    "users/updatePassword",
    async ({ id, passwordData }: { id: string, passwordData: UpdatePassword }, { rejectWithValue }) => {
        try {
            const endpoint = `/api/users/register/${id}/password`;
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

// Delete User
export const deleteStudent = createAsyncThunk(
    "users/delete",
    async ({ id }: { id: string, }, { rejectWithValue }) => {
        try {
            const endpoint = `/api/users/${id}`;
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

// Logout User
export const logOutUser = createAsyncThunk(
    "users/logout",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const endpoint = "/api/users/logout";
            await axios.post(endpoint);
            deleteCookie("authToken");
            localStorage.removeItem("authToken");
            dispatch(logoutStudent());

            return "Logout successful";
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Logout failed");
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
                state.user = { ...state.user, ...action.payload };
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

            // Logout User
            .addCase(logOutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                deleteCookie("authToken");
                localStorage.removeItem("authToken");
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export const { logoutStudent, setUser } = userSlice.actions;
export default userSlice.reducer;