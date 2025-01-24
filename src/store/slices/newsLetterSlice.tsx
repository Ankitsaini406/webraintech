import { createSlice } from "@reduxjs/toolkit";
import { updateNewsLetter } from "../actions/NewsLetterActions";

interface NewsLetters {
    email: string;
}

interface NewsLetterState {
    newsLetters: NewsLetters[];
    loading: boolean;
    error: string | null;
}

const initialState: NewsLetterState = {
    newsLetters: [],
    loading: false,
    error: null,
};

const newsLetterSlice = createSlice({
    name: 'newsLetter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateNewsLetter.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateNewsLetter.fulfilled, (state, action) => {
            state.loading = false;
            state.newsLetters.push(action.payload);
        })
        .addCase(updateNewsLetter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        },
});

export default newsLetterSlice.reducer;