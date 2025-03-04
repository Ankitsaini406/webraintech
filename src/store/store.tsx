
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./actions/ThemeActions";
import userReducer from "./actions/UserActions";
import contactUsReducer from "./actions/ContactUsAction";
import newsLetterReducer from "./actions/NewsLetterActions";
import findTeacherByCourseReducer from "./actions/FindTeacherByCourseAction"

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        contactus: contactUsReducer,
        newsletter: newsLetterReducer,
        findTeacherByCourse: findTeacherByCourseReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;