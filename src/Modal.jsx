import React from "react";
import styles from "./Modal.module.css";

function Modal({ isOpen, article, onClose }) {
  return (
    <div className={`${styles.modalContainer} ${isOpen ? styles.showModalContainer : ""}`}>

      <div className={styles.modal}>

        <button className={styles.closeBtn} onClick={onClose}>
            <i className="fa-solid fa-xmark" />
        </button>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.author}>{article.author}</p>
          <p className={styles.publishedAt}>{article.publishedAt}</p>
          <img className={styles.image} src={article.urlToImage} alt={article.title} />
          <p className={styles.content}>{article.content}</p>
          <a className={styles.link} href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>

      </div>

    </div>
  );
}

export default Modal;