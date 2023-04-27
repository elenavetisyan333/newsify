import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
    name: "news",
    initialState: {
        news: []
    },
    reducers: {
        setNews(state, {payload}){
            state.news = payload.map(article => {
                return  {...article, isSaved: article.isSaved}; 
            });
        },
        changeSavedState(state, {payload}){
            state.news = state.news.map(article => {
                return article.url == payload.article.url ? (
                    {
                        ...article,
                        isSaved: !article.isSaved
                    }
                ) : article;
            });
        }
    }
});


export const { setNews, changeSavedState } = newsSlice.actions;
export default newsSlice.reducer;