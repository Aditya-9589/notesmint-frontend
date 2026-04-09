
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
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error");
        }
    },
);

export const fetchBundleById = createAsyncThunk(
    "bundles/fetchById",
    async (id, thunkAPI) => {
        try {
            const res = await apiClient.get(`/bundles/${id}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error");
        }
    }
);

const bundleSlice = createSlice({
    name: "bundles",
    initialState: {
        bundles: [],
        singleBundle: null,
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
            })

            // fetch single bundle -> reducers
            .addCase(fetchBundleById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBundleById.fulfilled, (state, action) => {
                state.loading = false;
                state.singleBundle = action.payload;
            })
            .addCase(fetchBundleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bundleSlice.reducer;     // default export