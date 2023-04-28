import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "./Modal";
import NewsPart from "./NewsPart";

function Saved() {
    const savedArticles = useSelector(store => store.savedNews.savedNews);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState({});
  
    function handleArticleClick(article){
      setSelectedArticle(article);
      setIsModalOpen(true);
    }
  
    function handleCloseModal(){
      setSelectedArticle({});
      setIsModalOpen(false);
    }

    return (
        <div>
            <NewsPart articles={savedArticles} handleArticleClick={handleArticleClick}/>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} article={selectedArticle} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default Saved;