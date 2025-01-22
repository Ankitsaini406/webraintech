import { createSlice } from "@reduxjs/toolkit";
import { authStudentInitialState } from "@/utils/InitialState";
import { loginStudent, registerStudent, updatePassword, updateStudent } from "../actions/StudentActions";

const authStudentSlice = createSlice({
    name: "authStudent",
    initialState: authStudentInitialState,
    reducers: {
        logoutStudent: (state) => {
            state.student = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // Login Student
        .addCase(loginStudent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginStudent.fulfilled, (state, action) => {
            state.loading = false;
            state.student = action.payload.student;
            state.token = action.payload.token;
        })
        .addCase(loginStudent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Register Student
        .addCase(registerStudent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerStudent.fulfilled, (state, action) => {
            state.loading = false;
            state.student = action.payload.student;
            state.token = action.payload.token;
        })
        .addCase(registerStudent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update Student
        .addCase(updateStudent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateStudent.fulfilled, (state, action) => {
            state.loading = false;
            state.student = {...state.student, ...action.payload};
        })
        .addCase(updateStudent.rejected, (state, action) => {
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

export default authStudentSlice.reducer;