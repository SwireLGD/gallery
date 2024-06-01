import { createSlice } from "@reduxjs/toolkit";
import { Art } from "../../types";
import { createArt, deleteArt, fetchArts, fetchArtsByUserId } from "./artsThunks";
import { RootState } from "../../app/store";

interface artState {
    items: Art[];
    fetchLoading: boolean;
    createLoading: boolean;
    deleting: boolean;
}

const initialState: artState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    deleting: false,
};

export const artsSlice = createSlice({
    name: 'arts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchArts.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchArts.fulfilled, (state, { payload: arts }) => {
            state.fetchLoading = false;
            state.items = arts;
        });
        builder.addCase(fetchArts.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(fetchArtsByUserId.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchArtsByUserId.fulfilled, (state, { payload: arts }) => {
            state.fetchLoading = false;
            state.items = arts;
        });
        builder.addCase(fetchArtsByUserId.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createArt.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createArt.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createArt.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(deleteArt.pending, (state) => {
            state.deleting = true;
        });
        builder.addCase(deleteArt.fulfilled, (state, action) => {
            state.deleting = false;
            state.items = state.items.filter(item => item._id !== action.meta.arg);
        });
        builder.addCase(deleteArt.rejected, (state) => {
            state.deleting = false;
        });
    }
});

export const artsReducer = artsSlice.reducer;

export const selectArts = (state: RootState) => state.arts.items;
export const selectFetchLoading = (state: RootState) => state.arts.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.arts.createLoading;
export const selectDeleting = (state: RootState) => state.arts.deleting;