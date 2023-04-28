import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import Article from "./Article";
import Modal from "./Modal";
import styled from "@emotion/styled";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { setNews } from "./store/slices/news";
import { useDispatch } from "react-redux";

function Search() {
    const API_KEY = "0fff74d3c376404e916b48d5f60ce26f";
    const articles = useSelector(store => store.news.news);
    const savedNews = useSelector(store => store.savedNews.savedNews);

    const location = useParams();
    const searchText = location.searchText;
    const dispatch = useDispatch();

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
        const news = await axios
                    .get(`https://newsapi.org/v2/everything?q=${searchText}}&pageSize=${pageSize}&page=${currentPage}&apiKey=${API_KEY}`)
                    .then(rsp => rsp.data);

        const formattedNews = news.articles.map(article => {
            return savedNews.find(saved => saved.url == article.url) ? (
                {
                    ...article,
                    isSaved: true
                }
            ) : article;
        });
        dispatch(setNews(formattedNews));
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
                    articles.map((article, i) =>{
                        return <Article 
                                    article={article}  
                                    key={`article-${i}-${article.title}`}
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