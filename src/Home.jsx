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
import { countries } from "./countries";

function Home() {
    const API_KEY = "eb88c94ff5c0403dbab88f7a05913667";
    const articles = useSelector(store => store.news.news);
    const savedNews = useSelector(store => store.savedNews.savedNews);
    const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("us");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState({});
    const dispatch = useDispatch();

    async function getNews(){
        const news = await axios
                            .get(`https://newsapi.org/v2/top-headlines?country=${selectedCountry}&category=${selectedCategory}&apiKey=${API_KEY}`)
                            .then(rsp => rsp.data.articles);


        const formattedNews = news.map(article => {
            return savedNews.find(saved => saved.url == article.url) ? (
                {
                    ...article,
                    isSaved: true
                }
            ) : article;
        });
        dispatch(setNews(formattedNews));
    }
    useEffect(()=>{
        getNews();
    },[selectedCategory, selectedCountry]);
  
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
            <div className={styles.categoriesAndCountries}>
                <div className={styles.categories}>
                    {
                        categories.map((category) =>{
                            return(
                                <button className={styles.category} key={`category-${category}`} onClick={() => setSelectedCategory(category)}> {category} </button>
                            );
                        })
                    }                       
                </div>

                
                <select className={styles.countries} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option value="us">Select a Country</option>;
                    {
                        countries.map((country) =>{
                            return (
                                <option key={`country-${country.name}`} value={country.code}>{country.name}</option>
                            );
                        })
                    }
                </select>
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