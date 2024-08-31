import { connectToDB } from "@utils/database";
import Extrait from "@models/extrait";

export const PATCH = async (req) => {
  const { id } = await req.json(); // L'ID de l'extrait à liker

  try {
    await connectToDB();

    // Incrémenter le nombre de likes de l'extrait
    const extrait = await Extrait.findById(id);
    if (!extrait) {
      return new Response("Extrait introuvable", { status: 404 });
    }
    extrait.number_likes += 1;
    await extrait.save();

    return new Response(JSON.stringify(extrait), { status: 200 });
  } catch (error) {
    return new Response("Échec de l'incrémentation des likes", { status: 500 });
  }
};