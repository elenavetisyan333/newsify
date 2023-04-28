import React from "react";
import styles from "./Modal.module.css";
import { format } from "date-fns";


function Modal({ isOpen, article, onClose }) {
  const date = new Date(article.publishedAt);
  const formattedDate = format(date, "MM/dd/yyyy");

  return (
    <div className={`${styles.modalContainer} ${isOpen ? styles.showModalContainer : ""}`}>

      <div className={styles.modal}>

        <button className={styles.closeBtn} onClick={onClose}>
            <i className="fa-solid fa-xmark" />
        </button>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.author}>{article.author}</p>
          <p className={styles.publishedAt}>{formattedDate}</p>
          <img className={styles.image} src={article.urlToImage ? article.urlToImage : "https://storage.googleapis.com/stenbracka/public/placeholder.jpg"} alt={article.title} />
          <p className={styles.content}>{article.description}</p>
          <a className={styles.link} href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>

      </div>

    </div>
  );
}

export default Modal;