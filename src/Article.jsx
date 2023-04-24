/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Article.module.css";
import { format } from "date-fns";

function Article({article}) { 
    const date = new Date(article.publishedAt);
    const formattedDate = format(date, "MM/dd/yyyy");

  return (
    <div className={styles.article}>

        <img src={article.urlToImage ? article.urlToImage : "https://storage.googleapis.com/stenbracka/public/placeholder.jpg"} alt="article-photo" />

        <h3>{article.title}</h3>

        <p className={styles.description}>{article.description}</p>

        <div className={styles.authorAndDate}>
            <p className={styles.author}>{article.author}</p>
            <p className={styles.date}>{formattedDate}</p>
        </div>

        <div className={styles.forReader}>
          <div className={styles.saveAndShare}>
            <i className="fa-regular fa-bookmark"></i>
            <i className="fa-regular fa-paper-plane"></i>
          </div>

          <p>Read More...</p>
        </div>
    </div>
  );
}

export default Article;