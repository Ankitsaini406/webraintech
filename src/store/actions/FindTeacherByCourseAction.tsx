import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachersByCourses = createAsyncThunk(
    "teachsers/fetchByCourses",
    async (courses: string[], { rejectWithValue }) => {
        try {
            const response = await axios.post(`/api/teachers/courses`, { courses });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || "Failed to fetch teachers.");
            }
            return rejectWithValue("Failed to fetch teachers.");
        }
    }
);

const teacherSlice = createSlice({
    name: "teachers",
    initialState: {
        teachers: [],
        status: "idle",
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTeachersByCourses.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchTeachersByCourses.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.teachers = action.payload;
        })
        .addCase(fetchTeachersByCourses.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload as string;
        });
    },
});

export default teacherSlice.reducer;