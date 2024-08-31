import Link from "next/link";
import Image from "next/image";

//Cette composante sera utilisé pour poster un extrait ou pour éditer l'extrait 
const Formulaire = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <div className="flex items-center">
      <h1 className='head_text text-left'>
      <span> {type} un extrait 
    </span>
      </h1>
      <Image 
      src="/assets/images/post-it.png" 
      alt="Post-it Icon" 
      width={70} 
      height={70} 
      className='ml-2 mt-4'  // ml-2 pour ajouter un petit espace entre le texte et l'image
    />
    </div>

      <p className='desc text-left max-w-md'>
        {type} et partagez des extraits de vos lectures préférées avec le monde entier. 
        Que ce soit une citation inspirante, un passage poignant, ou un résumé captivant, 
        faites découvrir aux autres ce qui vous a marqué.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
         <label>
          <span className='font-satoshi font-semibold text-base text-gray-900'>
            Votre extrait
          </span>

          <textarea
            value={post.ext}
            onChange={(e) => setPost({ ...post, ext: e.target.value })}
            placeholder='Écrivez votre extrait ici'
            required
            className='form_textarea'
            maxLength={2500} // Limite le nombre de caractères
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-900'>
            Domaine décrit par un seul tag:{" "}
            <span className='font-normal text-gray-900'>
              IA, Technologie, Santé, Société, etc.
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
            maxLength={30} // Limite le nombre de caractères

          />
        </label>

        <label>
        <span className='font-satoshi font-semibold text-base text-gray-900'>
            Titre du livre/article 
          </span>
          <input
            value={post.titre}
            onChange={(e) => setPost({ ...post, titre: e.target.value })}
            type='text'
            placeholder='Titre'
            required
            className='form_input'
            maxLength={250} // Limite le nombre de caractères
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
        <Link href='/' className='violet_btn'>
              Annulez
        </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm orange_btn rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>


      </form>


    </section>
  )
}

export default Formulaire