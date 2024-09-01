//Render a Home Page- par default React 18 & NextJs 13 use SSR 
'use client';
//import React from 'react';
import { motion } from "framer-motion";
import Flux from "@components/Flux";

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
        Lisez, Partagez et Découvrez
        </h1>
      
        <h1 className='head_text text-center'>
            <span className ='orange_gradient text-center'>  MyReadSnap </span>
        </h1>
      
        
        <p className='desc text-center'>
        Bienvenue sur votre outil de création et de partage d'instants de lecture !
        </p>

     
        <p className=' text-center text-white'>
        Partagez vos résumés, extraits et citations avec d'autres passionnés de lecture. 
        Chaque connaissance partagée contribue à créer un monde plus éclairé. 
        </p>
       <p className=' text-center text-white'> 
        Rejoignez une communauté de lecteurs passionnés et faites de la connaissance une aventure 
        collective.
        </p>

        <Flux/>
    </section>



  )
}

export default Home;

