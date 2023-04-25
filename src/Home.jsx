import React from "react";
import styles from "./Home.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import Article from "./Article";
import Modal from "./Modal";

function Home() {
    const articles = useSelector(store => store.news.news);

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
        <div className="content">
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