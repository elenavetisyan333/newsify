/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Home from "./Home";
import Saved from "./Saved";
import { setNews } from "./store/slices/news";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
    const API_KEY = "eb88c94ff5c0403dbab88f7a05913667";
    const dispatch = useDispatch();

    async function getNews(){
        const news = await axios
                            .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
                            .then(rsp => rsp.data.articles);
        
        dispatch(setNews(news));
        console.log(news);    
    }
    useEffect(()=>{
        getNews();
    },[]);
    return (
        <div className="content">
            <Header/>
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/saved" element={<Saved/>} />
                <Route path="*" element={<Home/>} />
            </Routes>
        </div>
    );
}

export default App;