import { createAsyncThunk } from "@reduxjs/toolkit";
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
