import React from "react";
import styles from "./Article.module.css";
import { format } from "date-fns";
import { setSavedNews } from "./store/slices/savedNews";
import { changeSavedState } from "./store/slices/news";
import { useDispatch } from "react-redux";

function Article({article, onClick}) { 
    const dispatch = useDispatch();
    const date = new Date(article.publishedAt);
    const formattedDate = format(date, "MM/dd/yyyy");

    function checkSaved(){
      dispatch(setSavedNews({article}));
      dispatch(changeSavedState({article}));
    }

  return (
    <div className={styles.article}>

        <img src={article.urlToImage ? article.urlToImage : "https://storage.googleapis.com/stenbracka/public/placeholder.jpg"} alt="article-photo" />

        <h3 onClick={onClick} >{article.title}</h3>

        {/* <p className={styles.description}>{article.description}</p> */}

        <div className={styles.authorAndDate}>
            <p className={styles.author}>{article.author}</p>
            <p className={styles.date}>{formattedDate}</p>
        </div>

        <div className={styles.forReader}>
          <div className={styles.saveAndShare}>
            <i className={article.isSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} onClick={checkSaved} />
            <i className="fa-regular fa-paper-plane" onClick={() => navigator.share(article)} />
          </div>

          <p onClick={onClick}>Read More...</p>
        </div>
    </div>
  );
}

export default Article;