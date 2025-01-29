import { Middleware } from "@reduxjs/toolkit";
import { clearProtected, setAuthToken, setProtected } from "./protectedSlice";

export const authMiddleware: Middleware = (store) => (next) => (action: any) => {
    // Action type check
    if (action.type === setProtected.type || action.type === setAuthToken.type) {
        const state = store.getState();
        const { user, authToken } = state.user;

        // If no authToken or user, clear state and possibly redirect
        if (!authToken || !user) {
            store.dispatch(clearProtected());
        }
    }

    return next(action);
};
