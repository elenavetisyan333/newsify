import React from "react";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import Article from "./Article";

function Saved() {
    const savedArticles = useSelector(store => store.savedNews.savedNews);

    return (
        <div className={styles.homePage}>
            <div className={styles.newsPart}>
                {
                    savedArticles.map((article, i) =>{
                        return <Article 
                                    article={article}  
                                    key={`article-${i}`}
                                />;
                    })
                }
            </div>
          
        </div>
    );
}

export default Saved;