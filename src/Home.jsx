import React from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNews } from "./store/slices/news";
import { useState } from "react";
import { useSelector } from "react-redux";
import Article from "./Article";
import Modal from "./Modal";
// import { countries } from "./countries";

function Home() {
    const API_KEY = "eb88c94ff5c0403dbab88f7a05913667";
    const articles = useSelector(store => store.news.news);
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState({});
    const dispatch = useDispatch();

    async function getNews(){
        const news = await axios
                            .get(`https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${API_KEY}`)
                            .then(rsp => rsp.data.articles);
        
        dispatch(setNews(news));
        console.log(news);    
    }
    useEffect(()=>{
        getNews();
    },[selectedCategory]);
  
    function handleArticleClick(article){
      setSelectedArticle(article);
      setIsModalOpen(true);
    }
  
    function handleCloseModal(){
      setSelectedArticle({});
      setIsModalOpen(false);
    }

    return (
        <div className={styles.content}>
            <div className="countriesAndCategories">
                <div className={styles.categories}>
                    {
                        categories.map((category) =>{
                            return(
                                <button className={styles.category} key={`category-${category}`} onClick={() => setSelectedCategory(category)}> {category} </button>
                            );
                        })
                    }                       
                </div>
            </div>

            <div className={styles.homePage}>
                <div className={styles.newsPart}>
                    {
                        articles.map((article, i) =>{
                            return <Article 
                                        article={article}  
                                        key={`article-${i}`}
                                        onClick={() => handleArticleClick(article)}
                                    />;
                        })
                    }
                </div>
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} article={selectedArticle} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default Home;