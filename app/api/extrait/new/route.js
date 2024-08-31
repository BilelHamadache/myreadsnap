import { connectToDB } from "@utils/database";
import Extrait from "@models/extrait";

//How to create API
export const POST = async (req) => {
    const { userId, ext, tag, titre, number_likes } = await req.json();  // Extract the Data

    try {
        console.log('Se connecter au DB pour poster');
       await connectToDB; // Lambda wichi will be die after connecting to DB 

       console.log('Créer le Post');
       const newExtrait = new Extrait({ 
        creator: userId, 
        ext, 
        tag, 
        titre,
        number_likes});
       
       console.log('Save le Post dans le DB');
       await newExtrait.save();

       return new Response(JSON.stringify(newExtrait), { status: 201 })
    } catch (error) {
        return new Response("Echec....Publication de l'extrait est échouée", { status: 500 });
    }

}