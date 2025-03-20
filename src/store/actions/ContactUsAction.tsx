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

export const markContactAsRead = createAsyncThunk(
    'contactUs/markAsRead',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/contact-us/${id}/update`);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to mark contact as read');
            }
            return id;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Failed to mark contact as read');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
)

interface ContactUs {
    id: number;
    name: string;
    email: string;
    message: string;
    phoneNumber: string;
    read: boolean;
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
            })
            .addCase(markContactAsRead.fulfilled, (state, action) => {
                const index = state.contactUs.findIndex((c) => c.id === action.payload);
                if (index !== -1) {
                    state.contactUs[index].read = true;
                }
            });
    },
});

export default contactUsSlice.reducer;