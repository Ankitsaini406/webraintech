import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Update Subscriber
export const updateNewsLetter = createAsyncThunk(
    'newsletter/updateNewsLetter',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axios.put('/api/newsletter', { email });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Failed to update subscriber');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

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