import React from "react";
import axios from "axios";
import styles from "./Home.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNews } from "./store/slices/news";
import { useState } from "react";
import { useSelector } from "react-redux";
import Article from "./Article";
import Modal from "./Modal";
import { countries } from "./countries";
import styled from "@emotion/styled";
import Pagination from "@mui/material/Pagination";


function Home() {
    // const API_KEY = "eb88c94ff5c0403dbab88f7a05913667";
    const API_KEY = "0fff74d3c376404e916b48d5f60ce26f";
    const articles = useSelector(store => store.news.news);
    const savedNews = useSelector(store => store.savedNews.savedNews);
    const dispatch = useDispatch();

    const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("us");

    const [selectedArticle, setSelectedArticle] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const StyledPagination = styled(Pagination)({
        "& .MuiPaginationItem-root": {
          color: "#000",
          borderColor: "#000",
          fontWeight: "bold",
          "&.Mui-selected": {
            backgroundColor: "#000",
            color: "#fff",
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
                            .get(`https://newsapi.org/v2/top-headlines?country=${selectedCountry}&category=${selectedCategory}&pageSize=${pageSize}&page=${currentPage}&apiKey=${API_KEY}`)
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
    },[selectedCategory, selectedCountry, currentPage]);
  
    function handlePageChange(event, page){
        setCurrentPage(page);
    }

    function handleArticleClick(article){
      setSelectedArticle(article);
      setIsModalOpen(true);
    }
  
    function handleCloseModal(){
      setSelectedArticle({});
      setIsModalOpen(false);
    }
    return (
        <div className={styles.content}>
            <div className={styles.categoriesAndCountries}>
                <div className={styles.categories}>
                    {
                        categories.map((category) =>{
                            return(
                                <button className={styles.category} key={`category-${category}`} onClick={() => setSelectedCategory(category)}> {category} </button>
                            );
                        })
                    }                       
                </div>

                
                <select className={styles.countries} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option value="us">Select a Country</option>;
                    {
                        countries.map((country) =>{
                            return (
                                <option key={`country-${country.name}`} value={country.code}>{country.name}</option>
                            );
                        })
                    }
                </select>
            </div>

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

export default Home;