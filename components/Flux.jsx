'use client';

import { useState, useEffect } from "react";
import ReadsnapCard from "./ReadsnapCard";

import { motion } from 'framer-motion';


//Une nouvelle coposante: 
const ReadSnapCardList = ({ data, handleTagClick }) => {
  
 // const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];

  // on récupère dans data fetchedposts
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <motion.div
        whileHover={{ scale: 1.05 }}  // Animation on hover
      >
        <ReadsnapCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
        </motion.div>
      ))}
    </div>
  );
};

const Flux = () => {

    // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [AllfetchedPosts, setAllfetchedPosts] = useState([]);



  
  //Get Request for NextJS API. 
  const fetchPosts = async () => {
    const response = await fetch("/api/extrait");
    const data = await response.json();

    setAllfetchedPosts(data);
  }

  useEffect(() => {
    fetchPosts();//Start initially as the page loads 
  }, []);


//Rechercher des extraits  
//Filtrer des extraits par créateur, tag, mot dans un l'extrait
const filterExtraits = (searchtext) => {
  const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  return AllfetchedPosts.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.ext) ||
      regex.test(item.titre) 
  );
};

const handleSearchChange = (e) => {
  clearTimeout(searchTimeout);
  setSearchText(e.target.value); //Récupérer le text saisi

  setSearchTimeout(
    setTimeout(() => {
      const searchResult = filterExtraits(e.target.value);
      setSearchedResults(searchResult);
    }, 500)
  );
};

const handleTagClick = (tagName) => {
  setSearchText(tagName);

  const searchResult = filterExtraits(tagName);
  setSearchedResults(searchResult);
};


  return (
  <section className='feed'>
    <form className='relative w-full flex-center'>
      <input
        type='text'
        placeholder='Chercher un extrait, un domaine, titre ou un membre '
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
      />
    </form>

    {searchText ? (
        <ReadSnapCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <ReadSnapCardList data={AllfetchedPosts} handleTagClick={handleTagClick} />
      )}
  </section>

  )
}

export default Flux