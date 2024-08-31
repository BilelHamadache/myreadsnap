// here we can setup provider
import NextAuth from 'next-auth';
//import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

//Traiter l'authentification
//Creer un projet sur console cloud google et récupérer des infos 

console.log({clientId: process.env.GOOGLE_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET}
    )

// Authentification process-----------------
const traiter = NextAuth({
        providers: [
            GoogleProvider({
              clientId: process.env.GOOGLE_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            })
          ],
    callbacks:{
    async session ({session}){
        // get user id in runing session from MangoDB to know which user is online
        console.log('get user session');
        const sessionUser = await User.findOne({email: session.user.email});
        session.user.id = sessionUser._id.toString();  
        return session;
    },
    async signIn ({user, account, profile, email, credentials}) {
    //async signIn({ user, account, profile, email, credentials }) {
        try {
        //Se connecter àl BDD
        console.log('signIn: connexion au DB...');
        await connectToDB();

        //vérifier si user exsite
        console.log('vérifier si user existe dans MangoDB....');
        //const userExist = await User.findOne({email:profile.email});
        const userExist = await User.findOne({ email: profile?.email });


        //Sinon créer un nouveau user
        if(userExist === null)
        {
            await User.create({
                //email: profile.email,
                email: profile?.email,

                //username: profile.login,
                username: profile?.name.replace(/\s+/g, '').toLowerCase(),
                //username: profile.name.replace(" ", "").toLowerCase(),
                //username: profile.name.replace(/ /g, "").toLowerCase(),

                image: user.image,
                //image: profile.image,
              });
              console.log('User Created');
        }
        //si tt va bien
        return true
        } catch (error) {
            console.log('Erreur lors du SignIn', error.message);
            return false;
        }
    },
}
    })

export {traiter as GET, traiter as POST }