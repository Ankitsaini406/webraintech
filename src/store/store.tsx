
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer, // Add the theme reducer to the store
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;