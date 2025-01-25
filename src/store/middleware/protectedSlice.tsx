import { Users } from "@/utils/InitialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: Users | null;
    authToken: string | null;
}

const initialState: UserState = {
    user: null,
    authToken: null,
};

const protectedSlice = createSlice({
    name: 'protected',
    initialState,
    reducers: {
        setProtected: (state, action: PayloadAction<Users | null>) => {
            state.user = action.payload;
        },
        setAuthToken: (state, action: PayloadAction<string | null>) => {
            state.authToken = action.payload;
        },
        clearProtected: (state) => {
            state.user = null;
            state.authToken = null;
        },
    },
});

export const { setProtected, setAuthToken, clearProtected } = protectedSlice.actions;
export default protectedSlice.reducer;