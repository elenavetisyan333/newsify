import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slices/news";
import savedNewsSlice from "./slices/savedNews";

const store = configureStore({
    reducer: {
        news: newsSlice,
        savedNews: savedNewsSlice
    }
});

export default store;