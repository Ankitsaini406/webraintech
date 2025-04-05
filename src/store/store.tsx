
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./actions/ThemeActions";
import userReducer from "./actions/UserActions";
import contactUsReducer from "./actions/ContactUsAction";
import newsLetterReducer from "./actions/NewsLetterActions";
import findTeacherByCourseReducer from "./actions/FindTeacherByCourseAction"

const store = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            theme: themeReducer,
            contactus: contactUsReducer,
            newsletter: newsLetterReducer,
            findTeacherByCourse: findTeacherByCourseReducer,
        },
    })
};

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store;