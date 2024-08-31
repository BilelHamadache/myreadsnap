'use client';
//import React from 'react';


import { SessionProvider } from 'next-auth/react';
//children: car cette composante enveloppe les autres componenets 
//session : current session
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider
