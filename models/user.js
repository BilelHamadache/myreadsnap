//créer un modele (table) de user pour interagir avec mongoDB
import { Schema, model, models} from "mongoose";

const SchemaUser = new Schema({
    email: {
      type: String,
      unique: [true, 'Email existe déjà!'],
      required: [true, 'Email nécessaire!'],
    },
    username: {
      type: String,
      required: [true, 'Username nécessaire!'],
      //match: [/^(?=[a-zA-Z0-9\s()]{6,25}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9\s()]+(?<![_.])$/,"Username invalide, il doit contenir 8 à 20 lettres alphanumériques et doit être unique!"]
    },
    image: {
      type: String,
    }
  });

/*
  // l'objet models (DB) est fourni par Mongoose Library et cotneint tous les modeles définis 
  //Si un modèle "User" existe déja, il attribue le modele exsitant à cette variable
  //Sinon model function de mongoose créer un nouveau modele 

  Car celà est appelé à chaque connexion
  */
  const User = models.User || model("User", SchemaUser);

  export default User;