'use client';

import { useState, useMemo} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { AiOutlineLike } from "react-icons/ai";
import { motion } from 'framer-motion';
import { AiFillLike } from 'react-icons/ai';
import { FcLike,FcLikePlaceholder } from "react-icons/fc";




const ReadsnapCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname(); // Pour vérfier si on se trouve sur le chemin d'une page
  const router = useRouter();

  const [copied, setCopied] = useState("");

//Copy Function 
const handleCopy = () => {
  setCopied(post.ext);
  navigator.clipboard.writeText(post.ext);
  setTimeout(() => setCopied(false), 3000);
};

//Fonction pour visiter le profil d'un user
const handleProfileClick = () => {
  console.log(post);
  //Si le le visiteur du profil celui qui clique est le meme que créateur du post alors  
  if (post.creator._id === session?.user.id) return router.push("/myprofile");
  //Sinon
  router.push(`/myprofile/${post.creator._id}?name=${post.creator.username}`);
};


// Choose a color based on a random index
// List of colors
const cardColors = [
  'bg-yellow-200',
  'bg-pink-200',
  'bg-green-200',
  'bg-blue-200',
  'bg-orange-200',
  'bg-purple-200',
];
const randomColor = useMemo(() => {
  return cardColors[Math.floor(Math.random() * cardColors.length)];
}, []);

//  afficher/masquer le titre
const [showTitle, setShowTitle] = useState(false); 
const toggleTitleVisibility = () => {
    setShowTitle(prev => !prev);
  };

// Liker 
const [numberLikes, setNumberLikes] = useState(post.number_likes);
const handleLikeClick = async () => {
  setNumberLikes(prevLikes => prevLikes + 1); // Mise à jour immédiate sans passer par la BDD

  try {
    const response = await fetch('/api/like', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: post._id }),
    });

    if (!response.ok) {
      // Rétablir l'état précédent si la requête échoue
      setNumberLikes(prevLikes => prevLikes - 1);
      console.error("Échec de l'incrémentation des likes");
    }
  } catch (error) {
    // Rétablir l'état précédent en cas d'erreur
    setNumberLikes(prevLikes => prevLikes - 1);
    console.error("Erreur:", error);
  }

};
return (
<div className={`extrait_card ${randomColor}`}>
      <div className='flex justify-between items-start gap-5'>

        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-900'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.ext
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.ext ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      
      <p className='my-4 font-satoshi text-sm text-gray-900'>{post.ext}</p>

      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)} 
      >
        #{post.tag}
      </p>

      {/* Titre de l'extrait */}
      <div
        className='title-toggle-zone cursor-pointer mt-4'
        onClick={toggleTitleVisibility}
      >
        {showTitle ? (
          <div className='excerpt-title'>
            {post.titre}
          </div>
        ) : (
          <span className="text-sm ">Titre...</span>
        )}
      </div>

    {/* Nbr of likes */}
    {/*<div className='flex items-center'>*/}

    <div className='flex justify-between items-center'>
      {/* Affichage de la date de création */}
      <p className='font-inter text-sm text-gray-500 mt-2'>
        {new Date(post.createdAt).toLocaleDateString()} 
      </p>
      <div className='flex items-center'>
      <span className='ml-2' style={{ color: 'red' }}>{numberLikes}</span>

        {session?.user.id !== post.creator._id ? (
          <motion.div
          whileTap={{ scale: 1.3, color:  "#ff4e50" }}  // Animation on tap (click)
          whileHover={{ scale: 1.1, rotate: 5 }}  // Animation on hover
        >
          <AiOutlineLike size={20}  onClick={handleLikeClick} className='cursor-pointer' />
        </motion.div> 
        ):(
        
      <AiOutlineLike  size={20} style={{ color: 'gray' }} />
      )}

      </div>    
    </div>

      {session?.user.id === post.creator._id && pathName === "/myprofile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Éditer
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Retirer
          </p>
        </div>
      )}
</div>
            )
}

export default ReadsnapCard