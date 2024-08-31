'use client';
import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Formulaire from '@components/Formulaire';

const PostIt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ext:'', tag:'', titre:''});
    
    const CreatePost = async (e) => {
        e.preventDefault(); // prevent default event  of browser par exemple valider un form coté client avant de l'envoyer 
        setSubmitting(true);
        try {
        //Call API endpoint 
          const response = await fetch("/api/extrait/new", {
            method: "POST",
            body: JSON.stringify({
            userId: session?.user.id,
            ext: post.ext,
            tag: post.tag,
            titre: post.titre,
            number_likes:0
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
    type='Publiez'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={CreatePost}
    />
  )
}

export default PostIt
