import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import Article from "./Article";
import Modal from "./Modal";


function Search() {
    const location = useParams();
    const searchText = location.searchText;
    const API_KEY = "eb88c94ff5c0403dbab88f7a05913667";
    const [results, setResults] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState({});
  
    function handleArticleClick(article){
      setSelectedArticle(article);
      setIsModalOpen(true);
    }
  
    function handleCloseModal(){
      setSelectedArticle({});
      setIsModalOpen(false);
    }
    
    async function getNews(){
        setResults([]);
        const news = await axios
                    .get(`https://newsapi.org/v2/everything?q=${searchText}}&apiKey=${API_KEY}`)
                    .then(rsp => rsp.data);
        setResults(news.articles);
    }
    
    useEffect(()=>{
        getNews();
    },[searchText]);

  return (
    <div className="content">
        <div className={styles.homePage}>
            <div className={styles.newsPart}>
                {
                    results.map((article, i) =>{
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

export default Search;