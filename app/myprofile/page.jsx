"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profil from "@components/Profil";

const myprofile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState([]);

    //Get Request for NextJS API to fetch mes extraits 


  useEffect(() => {
    const fetchmyPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
    
        setMyPosts(data);
      };
      if (session?.user.id) fetchmyPosts();
    }, [session?.user.id]);
 

    const handleEdit = (post) => {
        //Navigate to another page 'Update-extrait
        router.push(`/update-extrait?id=${post._id}`);
      };

      const handleDelete = async (post) => {
        const hasConfirmed = confirm(
          "Êtes-vous sûr de vouloir supprimer cet extrait ?"
        );
    
        if (hasConfirmed) {
          try {
            await fetch(`/api/extrait/${post._id.toString()}`, {
              method: "DELETE",
            });
            //Aprés supprission GET all the posts of this specific user
    
            const filteredPosts = myPosts.filter((item) => item._id !== post._id);
            setMyPosts(filteredPosts);
          } catch (error) {
            console.log(error);
          }
        }
       
      };

  return (
    <Profil
    name='My'
    desc='Bienvenue sur votre page de profil personnalisée. 
    Partagez vos extraits de lecture exceptionnels et inspirez les autres 
    à explorer de nouveaux horizons, à se cultiver et à partager le savoir'
    data={myPosts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
  />
  )
}

export default myprofile;
