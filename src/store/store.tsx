
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./actions/ThemeActions";
import userReducer from "./actions/UserActions";
import protecedReducer from "./middleware/protectedSlice";
import newsLetterReducer from "./actions/NewsLetterActions";
import findTeacherByCourseReducer from "./actions/FindTeacherByCourseAction"
import { authMiddleware } from "./middleware/middleware";

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        proteced: protecedReducer,
        newsletter: newsLetterReducer,
        findTeacherByCourse: findTeacherByCourseReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;