//Ce comosant c'est pour le rendering des composants réutilisables sur toutes les pages

import '@styles/globals.css'; 
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';

export const metadat = {
    title :"MyReadSnap",
    description : "Paratgez vos lectures"
}

const RootLayout =({children}) => {
  return (
    <html lang="fr">
        <body>
            <Provider>
            <div className="main">
                <div className="gradient"/>
            </div>
            <main className="app">
                <Navbar/>
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;


