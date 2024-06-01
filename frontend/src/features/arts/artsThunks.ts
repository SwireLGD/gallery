import { createAsyncThunk } from "@reduxjs/toolkit";
import { Art } from "../../types";

export const fetchArts = createAsyncThunk<Art[]>(
    'arts/fetchArts',
    async () => {
        try {
            const response = await
        }
    }
)