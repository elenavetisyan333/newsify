import React from "react";
import styles from "./Category.module.css";

function Category({category, setSelectedCategory}) {
  return (
    <button className={styles.category} onClick={() => setSelectedCategory(category)}> {category} </button>
  );
}

export default Category;