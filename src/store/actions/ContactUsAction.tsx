import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContactUs = createAsyncThunk(
    'contactUs/fetchContactUs',
    async (_, { rejectWithValue }) => { 
        try {
            const response = await axios.get('/api/contact-us');
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch contact us data');
            }
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Failed to fetch contact us data');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

interface ContactUs {
    id: number;
    name: string;
    email: string;
    message: string;
    phoneNumber: string;
}

interface ContactUsState {
    contactUs: ContactUs[];
    loading: boolean;
    error: string | null;
}

const initialState: ContactUsState = {
    contactUs: [],
    loading: false,
    error: null,
};

const contactUsSlice = createSlice({
    name: 'contactUs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactUs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContactUs.fulfilled, (state, action) => {
                state.loading = false;
                state.contactUs = action.payload;
            })
            .addCase(fetchContactUs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default contactUsSlice.reducer;