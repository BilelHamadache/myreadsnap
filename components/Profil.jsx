import {useSession } from 'next-auth/react';
import Image from 'next/image';
import ReadsnapCard from "./ReadsnapCard";
import { motion } from "framer-motion";

const Profil = ({name, desc, data, handleEdit, handleDelete}) => {
  //const { data: session } = useSession();

  return (
    <section className='w-full'>
      
      

      {/* Affichage de l'image et du nom de l'utilisateur */}
      {data.length > 0 && (
        <div className="flex items-center mt-4">
          <Image
            src={data[0].creator.image}
            alt={`${name}'s profile image`}
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
          <h2 className='ml-4 text-lg font-semibold'>
          <span className='inline-block p-2 rounded-lg bg-white text-black-600'>
            {name} Profile
        </span>
        </h2>
        </div>
      )}


      




      <p className='desc text-left'>{desc}</p>


      {/* Titre pour les postes avec animation */}

  <div className='flex items-center mt-4 mr-4'>
  <h2 className='text-lg font-semibold relative'>
    <span className='inline-block p-2 mb-2 mt-4 rounded-lg  bg-white text-black-600'>
      Posts:
      
      <motion.div 
        className='absolute bottom-0 left-0 transform translate-y-1/2 border-t-2 border-white'
        initial={{ width: 0 }}
        animate={{ width: 'calc(90vw - 70px)' }} // La ligne s'étend de gauche à droite avec une marge de 60px à droite
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </span>
  </h2>
</div>

      <div className='mt-10 prompt_layout'>
      {data.map((post) => (
         <motion.div
         whileHover={{ scale: 1.05 }}  // Animation on hover
       >
        <ReadsnapCard
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
        </motion.div>
      ))}
    </div>


    
  </section>
  )
}

export default Profil