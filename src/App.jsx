/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Saved from "./Saved";
import Search from "./Search";

function App() {
    return (
        <div className="content">
            <Header/>
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/saved" element={<Saved/>} />
                <Route path="/search/:searchText" element={<Search/>} />
                <Route path="*" element={<Home/>} />
            </Routes>
        </div>
    );
}

export default App;