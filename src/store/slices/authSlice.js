// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import apiClient from "../../services/apiClient";

import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    // initialState: {
    //     user: null,
    //     token: localStorage.getItem("token") || null,
    // },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;

            localStorage.setItem("token", action.payload.token);
        },

        setLoading: (state) =>{
            state.loading = true;
        },

        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;

            localStorage.removeItem("token");
        },
    },
});

// ----------------------------------------------------------------------------------------------------

// AsyncThunk (APi Call)
// export const fetchBundles = createAsyncThunk(
//     "bundles/fetchBundles",
//     async (_, thunkAPI) => {
//         try {
//             const response = await apiClient.get("/bundle");    // adjust if needed
//             return response.data;
//         }   catch (error) {
//             return thunkAPI.rejectWithValue(error.response?.data || "Error");
//         }
//     }
// );

// const bundleSlice = createSlice({
//     name: "bundles",
//     initialState: {
//         bundles: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchBundles.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchBundles.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.bundles = action.payload;
//             })
//             .addCase(fetchBundles.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;

// best approach to create different slices for diff functionality,
// export default authSlice.reducer;   