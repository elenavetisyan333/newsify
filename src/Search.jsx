import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import NewsPart from "./NewsPart";
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

    const [loading, setLoading] = useState(false);
  
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
        color: "#fff",
        borderColor: "#000",
        fontWeight: "bold",
        fontSize: "17px",
        "&.Mui-selected": {
          backgroundColor: "#d8b553",
          color: "#000",
          "&:hover": {
              backgroundColor: "#000",
              color: "#fff"
            }
        },
        "&:hover": {
          backgroundColor: "white",
          color: "black"
        },
        "& .MuiPaginationItem-icon": {
          fontSize: "30px",
        }
      },
    });

    async function getNews(){
        const news = await axios
                    .get(`https://newsapi.org/v2/everything?q=${searchText}}&pageSize=${pageSize}&page=${currentPage}&apiKey=${API_KEY}`)
                    .then(rsp => {
                                  setLoading(false);
                                  return rsp.data;
                                });

        const formattedNews = news.articles.map(article => {
            return savedNews.find(saved => saved.url == article.url) ? (
                {
                    ...article,
                    isSaved: true
                }
            ) : article;
        });
        dispatch(setNews(formattedNews));
        setTotalResults(news.totalResults > 100 ? 100 : news.totalResults);
    }
    useEffect(()=>{
      setLoading(true);
      getNews();
    },[searchText, currentPage]);
    return (
      loading ? (
        <img src="/loading.svg" alt="" style={
          {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
          }
      }/>
      ) : ( articles.length == 0 ? (
            <img className={styles.searchImg} src="/search.png" alt=""/>
      ) : (
        <div className="content">

            <NewsPart articles={articles} handleArticleClick={handleArticleClick}/>    

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
      )
    )
  );
}

export default Search;