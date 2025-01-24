
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authStudentReducer from "./slices/studentSlice";
import newsLetterReducer from "./slices/newsLetterSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        student: authStudentReducer,
        newsletter: newsLetterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;