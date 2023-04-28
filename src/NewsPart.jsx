import React from "react";
import Article from "./Article";
import styles from "./NewsPart.module.css";

function NewsPart({articles, handleArticleClick}) {
  return (
    <div className={styles.homePage}>
        <div className={styles.newsPart}>
            {
                articles.map((article, i) =>{
                    return <Article 
                                article={article}  
                                key={`article-${i}-${article.title}`}
                                onClick={() => handleArticleClick(article)}
                            />;
                })
            }
        </div> 
    </div>
  );
}

export default NewsPart;