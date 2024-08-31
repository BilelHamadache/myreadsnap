import { connectToDB } from "@utils/database";
import Extrait from "@models/extrait";

export const GET = async (req) => {

    try {
        console.log('Se connecter au DB pour récupérer les posts');
        await connectToDB(); // Lambda wichi will be die after connecting to DB

        //Filtrer les extraits (les posts = extraits)
        console.log('Collecter tous les extraits');
        const posts = await Extrait.find({}).populate('creator').sort({ createdAt: -1 }) // Collection Extrait

        return new Response(JSON.stringify(posts), { status: 200 })
        
    } catch (error) {
        return new Response("Echec! Nous n'avons pas pu récupérer tous les extraits", { status: 500 })
    }
}