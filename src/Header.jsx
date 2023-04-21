import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.insideHeader}>
            {/* <img src="/newsify-first.png" alt="newsify-logo" className={styles.logo} height={100}/> */}
            <h1>Newsify</h1>
            <form className={styles.searchBox}>
                <input type="text" className={styles.searchInput} placeholder="Search..." />
                <i className={"fa fa-search search-icon " + styles.searchIcon}></i>
            </form>
        </div>
    </div>
  );
}

export default Header;