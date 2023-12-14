import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
    name: "test",
    initialState: {
        count: 0,
    },
    reducers: {
        increase: (state) => {
            state.count++;
        }
    }
});

export const { increase } = testSlice.actions;