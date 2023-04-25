import { createSlice } from "@reduxjs/toolkit";

const savedNewsSlice = createSlice({
    name: "news",
    initialState: {
        savedNews: []
    },
    reducers: {
        setSavedNews(state, {payload}){
            const exists = Array.from(state.savedNews).find(news => news.url == payload.article.url);
            if(exists){
                state.savedNews = state.savedNews.filter(news =>{
                    return news.url != payload.article.url;
                });
            }
            else{
                state.savedNews = [
                    ...state.savedNews, {
                        ...payload.article,
                        isSaved: true
                    }
                ];
            }
        }
    }
});


export const { setSavedNews } = savedNewsSlice.actions;
export default savedNewsSlice.reducer;