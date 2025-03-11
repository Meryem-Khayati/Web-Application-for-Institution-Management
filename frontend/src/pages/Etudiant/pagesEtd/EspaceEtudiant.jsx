import React from 'react'
import Navbar from '../../partiePublic/components/Navbar'
import { Link } from 'react-router-dom'
import '../css/etd.css'

export default function EspaceEtudiant() {
  return (
    <>
   
    <div className='image-background-etudiant'>
      <div className='etdimg'></div>
        <section className='section-etudiant'>
          <h1>Bienvenue sur l'Espace Etudiant</h1>
          <p>Cet espace offre un accès centralisé aux différents services de notre École Supérieure de Technologie tels que la consultation des profils, des notes et la demande de documents.</p>
          <Link to='/auth/login'><button>Accéder à  mon espace</button></Link>
        </section>
    </div></>
    
  )
}
