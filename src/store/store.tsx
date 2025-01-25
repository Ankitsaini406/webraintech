
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";
import protecedReducer from "./middleware/protectedSlice";
import newsLetterReducer from "./slices/newsLetterSlice";
import { authMiddleware } from "./middleware/middleware";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        proteced: protecedReducer,
        newsletter: newsLetterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;