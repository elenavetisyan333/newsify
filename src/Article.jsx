/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Article.module.css";
import { format } from "date-fns";
import { useState } from "react";
import { setSavedNews } from "./store/slices/savedNews";
import { useDispatch } from "react-redux";

function Article({article}) { 
    const dispatch = useDispatch();
    const [saved, setSaved] = useState(false);
    const date = new Date(article.publishedAt);
    const formattedDate = format(date, "MM/dd/yyyy");

    function checkSaved(){
      dispatch(setSavedNews({article}));
      setSaved(!saved);
    }
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
            <i className={saved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} onClick={checkSaved}></i>
            <i className="fa-regular fa-paper-plane"></i>
          </div>

          <p>Read More...</p>
        </div>
    </div>
  );
}

export default Article;