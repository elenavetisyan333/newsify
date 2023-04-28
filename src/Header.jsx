import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${searchText}`);
    setSearchText("");
  }

  return (
    <div className={styles.header}>
        <div className={styles.insideHeader}>
            {/* <img src="/newsify-first.png" alt="newsify-logo" className={styles.logo} height={100}/> */}
            <h1>
              <NavLink to="/home">Newsify</NavLink>
            </h1>
            <form className={styles.searchBox} onSubmit={handleSubmit}>
                <input type="text"
                        className={styles.searchInput}
                        placeholder="Search..."
                        name="searchText"
                        id="searchText"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} 
                />

                <button type="submit" className={styles.searchButton}>
                  <i className={"fa fa-search search-icon " + styles.searchIcon}/>
                </button>
            </form>
            <h3> 
              <NavLink to="/saved">
                <i className={`fa-solid fa-bookmark ${styles.savedArticles}`}/>
              </NavLink>
            </h3>
        </div>
    </div>
  );
}

export default Header;