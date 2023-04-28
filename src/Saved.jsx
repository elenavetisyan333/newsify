import React from "react";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Article from "./Article";
import Modal from "./Modal";

function Saved() {
    const savedArticles = useSelector(store => store.savedNews.savedNews);

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

    return (
        <div className={styles.homePage}>
            <div className={styles.newsPart}>
                {
                    savedArticles.map((article, i) =>{
                        return <Article 
                                    article={article}  
                                    key={`article-${i}-${article.title}`}
                                    onClick={() => handleArticleClick(article)}
                                />;
                    })
                }
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} article={selectedArticle} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default Saved;