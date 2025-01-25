import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authUserInitialState, Users } from "@/utils/InitialState";
import { deleteCookie, setCookie } from "cookies-next"
import { loginUser, registerUser, updatePassword, updateUser } from "../actions/UserActions";

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