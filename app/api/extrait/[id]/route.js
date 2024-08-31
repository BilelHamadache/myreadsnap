import Extrait from "@models/extrait";
import { connectToDB } from "@utils/database";

//API Endpoints for :

//GET One post a specific user id (to be edited)
export const GET = async (req, {params}) => {

    try {
        console.log('Se connecter au DB pour récupérer le post à éditer');
        await connectToDB; // Lambda wichi will be die after connecting to DB

        //Trouver l'extrait à modifier ou à supprimer 
        const post = await Extrait.findById(params.id).populate('creator')

        if (!post) return new Response("L'extrait n'est pas trouvé", { status: 404 });

        return new Response(JSON.stringify(post), { status: 200 })
        
    } catch (error) {
        return new Response("Echec! Nous n'avons pas pu récupérer l'extrait en question", { status: 500 })
    }
}

//PATCH (Update for Edit function)

export const PATCH = async (request, { params }) => {
    const { ext, tag, titre } = await request.json();

    try {
        console.log('Connecting to DB from API PATCH...');
        await connectToDB();

        // Find the existing extrait by ID
        console.log('API PATCH... find Extrait data By Id');
        const existingExtrait = await Extrait.findById(params.id);
        console.log('API PATCH... findById->Success ');

        if (!existingExtrait) {
            return new Response("L'extrait n'est pas trouvé", { status: 404 });
        }

        console.log('Upadating post...');
        // Update extrait  with new data
        existingExtrait.ext = ext;
        existingExtrait.tag = tag;
        existingExtrait.titre = titre;

        console.log('Save Updating  post...');
        await existingExtrait.save();

        //return new Response("Mise à jour réussie", { status: 200 });
        return new Response(JSON.stringify(existingExtrait), { status: 200 });

    } catch (error) {
        return new Response("Échec de la mise à jour", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Trouver l'Extrait et supprimez le  by ID 
        await Extrait.findByIdAndRemove(params.id);

        return new Response("Extrait retiré avec succès", { status: 200 });
    } catch (error) {
        return new Response("Erreur lors de la suppression de l'extrait", { status: 500 });
    }
};


// DELETE (Delete for Delete function )