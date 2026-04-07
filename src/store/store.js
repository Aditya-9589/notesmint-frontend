import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bundleReducer from "./slices/bundleSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        bundles: bundleReducer,
    },
});

export default store;