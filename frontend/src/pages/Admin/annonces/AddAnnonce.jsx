import React, { useState } from 'react';
import { annonceServices } from '../../services/annonceServices';
export default function AddAnnonce() {
    
    
    const [annonces, setAnnonces] = useState({
        titre:"",
        description:"",
        datePublication:""
    });
    const [message, setMessage] = useState('');
    const [isTrue, setIstrue] = useState(false);

    function resetData(){
      setAnnonces({
         
        titre:"",
        description:"",
        datePublication:""
      })
  
    }
    
    function handleChange(e){
      setAnnonces({
        ...annonces,
        [e.target.name]:e.target.value,
      })
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      annonceServices.ajouterAnnonce(annonces)
        .then(res => {console.log(res.data)
          setMessage("actualité a ete ajoutee")
          setIstrue(true)
          resetData();

        })
        .catch(err =>{ console.log(err.data)
          setMessage(" Erreur l'ors de l'ajout de l'actualité")
          setIstrue(false)
        });
    };
    
    
    return (
      <section id='admin-add-filier-container-etudiant'  className='admin-add-filier-container'>
      <div className='add-content'>
          <div className='title-add-filier'>
            <h2 className="lora-myuniqueclass">Ajouter un actualité</h2>
          </div>
          {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

          <form onSubmit={handleSubmit} className='form-add-filier'>
            <input className='input-add-filier' type='text' name='titre' placeholder='titre de l actualité...' value={annonces.titre} onChange={handleChange} required/>
            <input className='input-add-filier' type='text' name='description' placeholder='descreption de l actualité...' value={annonces.description} onChange={handleChange} required/>
            <input className='input-add-annonce-date' type='date' name='datePublication' placeholder='date de l actualité ...' value={annonces.datePublication} onChange={handleChange} required/>
            <button className='btnadd'>Ajouter</button>
          </form>
        </div>
      </section>
    );
    }