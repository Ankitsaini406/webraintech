
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./actions/ThemeActions";
import userReducer from "./actions/UserActions";
import protecedReducer from "./middleware/protectedSlice";
import newsLetterReducer from "./actions/NewsLetterActions";
import findTeacherByCourseReducer from "./actions/FindTeacherByCourseAction"

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        proteced: protecedReducer,
        newsletter: newsLetterReducer,
        findTeacherByCourse: findTeacherByCourseReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;