"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profil from "@components/Profil";

const UserProfileToVisit = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchUserPosts();
  }, [params.id]);

  return (
    <Profil
      name={userName}
      desc={`Bienvenue sur la page de profil personnalisée de ${userName}. 
      Découvrez les extraits partagés par ${userName}. Laissez-vous inspirer par ses centres d'intérêt et 
      enrichissez ainsi votre propre savoir.`}
      data={userPosts}
    />
  );
};

export default UserProfileToVisit;