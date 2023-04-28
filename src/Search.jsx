import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import Article from "./Article";
import Modal from "./Modal";
import styled from "@emotion/styled";
import Pagination from "@mui/material/Pagination";



function Search() {
    const location = useParams();
    const searchText = location.searchText;
    const API_KEY = "eb88c94ff5c0403dbab88f7a05913667";
    const [results, setResults] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState({});

    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;
  
    function handleArticleClick(article){
      setSelectedArticle(article);
      setIsModalOpen(true);
    }
  
    function handleCloseModal(){
      setSelectedArticle({});
      setIsModalOpen(false);
    }

    function handlePageChange(event, page){
        setCurrentPage(page);
    }

    const StyledPagination = styled(Pagination)({
        "& .MuiPaginationItem-root": {
          color: "#000",
          borderColor: "#000",
          "&.Mui-selected": {
            backgroundColor: "#000",
            color: "#fff",
          },
          "&:hover": {
            backgroundColor: "#eee",
            color: "black"
          },
        },
      });

    async function getNews(){
        setResults([]);
        const news = await axios
                    .get(`https://newsapi.org/v2/everything?q=${searchText}}&pageSize=${pageSize}&page=${currentPage}&apiKey=${API_KEY}`)
                    .then(rsp => rsp.data);
        setResults(news.articles);
        setTotalResults(news.totalResults > 100 ? 100 : news.articles.length);
    }
    
    useEffect(()=>{
        getNews();
    },[searchText, currentPage]);

  return (
    <div className="content">
        <div className={styles.homePage}>
            <div className={styles.newsPart}>
                {
                    results.map((article, i) =>{
                        return <Article 
                                    article={article}  
                                    key={`article-${i}`}
                                    onClick={() => handleArticleClick(article)}
                                />;
                    })
                }
            </div> 
        </div>
        {isModalOpen && (
            <Modal isOpen={isModalOpen} article={selectedArticle} onClose={handleCloseModal} />
        )}
        <div className={styles.pagination}>
            <StyledPagination
                page={currentPage}
                count={Math.ceil(totalResults / pageSize)}
                pagesize={pageSize}
                onChange={handlePageChange}
                color="primary"
            />
        </div>
    </div>
  );
}

export default Search;