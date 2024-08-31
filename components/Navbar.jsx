
"use client"; // pour pouvoir utiliser client based functionalities comme hooks
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react'; // coté client 
import {signIn, signOut,useSession, getProviders, } from 'next-auth/react';

const Navbar = () => {
  //const isUserLoggedIn = true; // que se passe t il si on est connecté 
  const { data: session } = useSession();


  const [menu, setMenu] = useState(false) // Pour le menu déroulant pour écran Mobile

  const [providers, setProvidersState] = useState(null); //Pour les Providers comme Google  auth

  useEffect(() => {
    const setUpProviders = async() => 
    {
      const response = await getProviders();
      setProvidersState(response);
    }
    setUpProviders();
  }, [])
  
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      {/*LOGO*/}
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo1.svg'
          alt='logo'
          width={50}
          height={50}
          className='object-contain'
        />
        <div>
        <p className='logo_text'>MyReadSnap</p>
        <p className='text-sm font-semibold text-white text-center'
        style={{
          background: 'linear-gradient(90deg, #FFD700 0%, #FFAA00 50%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
    Savoir + Savoir ne fait pas deux, mais trois!
        </p>      
        </div>
  </Link>


      {console.log(providers)}

      {/*Desktop Navigation*/}
      <div className='hidden sm:flex'>
        {session?.user ? ( 
          <div className='flex gap-3 md:gap-5'>
            <Link href='/post-it' className='black_btn'>
              Post it
            </Link>

            <button type='button' onClick={signIn} className='outline_btn'>
            Sign Out
            </button>
          
          <Link href='/myprofile'>
          <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
          </Link>

          </div>
          //If we do access to providers than
          ): (<> {providers && Object.values(providers).map((provider) => (<button 
                                                                            type='button'
                                                                            key={provider.name}
                                                                            onClick={() => {signIn(provider.id);0}}
                                                                            className='black_btn'>
                                                                              SignIn

                                                                            </button>))}
                                                                            </>)}
      </div>

      {/*Mobile Navigation*/}
      <div className='sm:hidden flex relative'>
      {session?.user ? (
      <div className='flex'>
        <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={()=>setMenu((prev) => !prev)}
              />
              {menu && (<div className='dropdown'>

                <Link
                  href='/myprofile'
                  className='dropdown_link flex items-center'
                  onClick={() => setMenu(false)}
                >
                 Mon Profil 
                 <Image
              src='/assets/images/monprofil.png'
              alt='Post-it Icon'
              width={20}
              height={20}
              className='ml-2' // Ajout d'un espace entre le texte et l'image
            />
                </Link>
                <Link
                  href='/post-it'
                  className='dropdown_link flex items-center'
                  onClick={() => setMenu(false)}
                >
                 Post it
                 <Image
              src='/assets/images/post-it.png'
              alt='Post-it Icon'
              width={20}
              height={20}
              className='ml-2' // Ajout d'un espace entre le texte et l'image
            />
                </Link>
                <button type='button'
                  onClick={() => {
                    setMenu(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'>
                  Sign Out
                </button>
              </div>)}
      </div>): (<>{providers && Object.values(providers).map((provider) => (<button 
                                                                            type='button'
                                                                            key={provider.name}
                                                                            onClick={() => {signIn(provider.id);0}}
                                                                            className='black_btn'>
                                                                              SignIn

                                                                            </button>))}</>)}

      </div>

    </nav>
      )
}

export default Navbar