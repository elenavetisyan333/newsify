/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Article.module.css";

function Article({article}) {
  return (
    <div className={styles.article}>

        <img src={article.urlToImage} alt="article-photo" />
        
        <h3>{article.title}</h3>

        <p className={styles.description}>{article.description}</p>

        <div className={styles.authorAndDate}>
            <p>{article.author}</p>
            <p className={styles.date}>01/01/2023</p>
        </div>

    </div>
  );
}

export default Article;