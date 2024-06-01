import { createAsyncThunk } from "@reduxjs/toolkit";
import { Art, ArtMutation } from "../../types";
import axiosApi from "../../axiosApi";
import axios from "axios";

export const fetchArts = createAsyncThunk<Art[]>(
    'arts/fetchArts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get<Art[]>('/arts');
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            } else {
                return rejectWithValue({ error: 'An unknown error occurred' });
            }
        }
    }
);

export const createArt = createAsyncThunk<void, ArtMutation>(
    'arts/createArt',
    async (artMutation, { rejectWithValue }) => {
        const formData = new FormData();

        const keys = Object.keys(artMutation) as (keyof ArtMutation)[];

        keys.forEach(key => {
            const value = artMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            const response = await axiosApi.post('/arts', formData);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            } else {
                return rejectWithValue({ error: 'Something went wrong' });
            }
        }
    }
);

export const deleteArt = createAsyncThunk<void, string>(
    'arts/deleteart',
    async (artId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(`/arts/${artId}`);

            if (response.status !== 204) {
                return rejectWithValue('Failed to delete the art');
            }

            return;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    if (e.response.status === 403) {
                        return rejectWithValue('Unauthorized to delete the art');
                    } else if (e.response.status === 404) {
                        return rejectWithValue('art not found');
                    } else {
                        return rejectWithValue(e.response.data.message || 'server error during deletion');
                    }
                }
            }
            return rejectWithValue('Network error or unable to reach server');
        }
    }
);