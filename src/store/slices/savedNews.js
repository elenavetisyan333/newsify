import { createSlice } from "@reduxjs/toolkit";

const savedNewsSlice = createSlice({
    name: "news",
    initialState: {
        savedNews: []
    },
    reducers: {
        setSavedNews(state, {payload}){
            state.savedNews = payload;
        }
    }
});


export const { setSavedNews } = savedNewsSlice.actions;
export default savedNewsSlice.reducer;