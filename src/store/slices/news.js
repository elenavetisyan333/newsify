import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
    name: "news",
    initialState: {
        news: []
    },
    reducers: {
        setNews(state, {payload}){
            state.news = payload;
        }
    }
});


export const { setProducts } = newsSlice.actions;
export default newsSlice.reducer;