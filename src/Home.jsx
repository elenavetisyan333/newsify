import React from "react";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import Article from "./Article";

function Home() {
    const articles = useSelector(store => store.news.news);

    return (
        <div className={styles.homePage}>
            <div className={styles.newsPart}>
                {
                    articles.map((article, i) =>{
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

export default Home;