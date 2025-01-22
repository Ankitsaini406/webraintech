import { StudentUpdateData, UpdatePassword } from "@/utils/InitialState";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login Student
export const loginStudent = createAsyncThunk(
    "authStudent/login",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/students/login", credentials);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Login failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

// Register Student
export const registerStudent = createAsyncThunk(
    "authStudent/register",
    async (studentData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/students/register", studentData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Registration failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

// Update Student
export const updateStudent = createAsyncThunk(
    "authStudent/update",
    async ({ id, updateData }: { id: string, updateData: StudentUpdateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/students/${id}`, updateData);
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
    "authStudent/updatePassword",
    async ({ id, passwordData }: { id: string, passwordData: UpdatePassword }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/students/${id}/password`, passwordData);
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
    "authStudent/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/students/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Delete failed");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);