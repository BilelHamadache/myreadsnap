'use client';
import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Formulaire from '@components/Formulaire';

const Editextrait = () => {
    const router = useRouter();
    //const { data: session } = useSession();
    const searchParams = useSearchParams();
    const extraitId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ext:'', tag:'', titre:''});


    //Chargez les données de l'extrait: 
    useEffect(() => {
        const getExtraitDetails = async () => {
            //Appler l'API
          const response = await fetch(`/api/extrait/${extraitId}`);
          const data = await response.json();
    
          setPost({
            ext: data.ext,
            tag: data.tag,
            titre: data.titre,
          });
        };
        // On appelle cette fonction suelement si extraitId existe
    
        if (extraitId) getExtraitDetails();
      }, [extraitId]);


    
    const UpdatePost = async (e) => {
        e.preventDefault(); // prevent default event  of browser par exemple valider un form coté client avant de l'envoyer 
        setSubmitting(true);

        if (!extraitId) return alert("L'id de votre extrait est introuvable!");

        try {
        //Call API endpoint 
          const response = await fetch(`/api/extrait/${extraitId}`, {
            method: "PATCH",
            body: JSON.stringify({
            ext: post.ext,
            tag: post.tag,
            titre: post.titre,
            }),
          });
          if (response.ok) {
            router.push("/");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }

    }
    
  return (
    <Formulaire 
    type='Éditer'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={UpdatePost}
    />
  )
}

export default Editextrait;
