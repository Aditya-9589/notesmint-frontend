
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

// const initialState = {
//     user: null,
//     token: localStorage.getItem("token") || null,
// }

export const fetchBundles = createAsyncThunk(   // named export
    "bundles/fetchBundles",
    async (_, thunkAPI) => {
        try {
            // const response = await apiClient.get("/bundle");
            const response = await apiClient.get("/bundles");
            return response.data;
        }   catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data  || "Error");
        }
    }
);

const bundleSlice = createSlice({
    name: "bundles",
    initialState: {
        bundles: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBundles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBundles.fulfilled, (state, action) => {
                state.loading = false;
                state.bundles = action.payload;
            })
            .addCase(fetchBundles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bundleSlice.reducer;     // default export