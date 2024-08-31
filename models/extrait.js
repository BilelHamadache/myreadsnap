//créer un modele (table) de l'extrait publié
import { Schema, model, models} from "mongoose";

const SchemaExtrait = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', // One-to-many relationship
      },
      ext: {
        type: String,
        required: [true, 'Extrait est nécessaire.'],
      },
      tag: {
        type: String,
        required: [true, 'Tag est nécessaire.'],
      },
      titre: {
        type: String,
        required: [true, 'Titre est nécessaire.'],
      },
      number_likes: {
        type: Number,
        //default: 0, // Initialise le nombre de likes à 0
      },

}, { timestamps: true }); // Ajoute les champs createdAt et updatedAt automatiquement

const Extrait = models.Extrait || model('Extrait',  SchemaExtrait);
export default Extrait;
 