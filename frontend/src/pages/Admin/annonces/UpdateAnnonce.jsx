import React, { useEffect, useState } from 'react';
import { annonceServices } from '../../services/annonceServices';
import { useParams } from 'react-router-dom';

export default function UpdateAnnonce() {
    const idannonce =useParams().idannonce;

    const [annonces, setAnnonces] = useState({
        titre:"",
        description:"",
        datePublication:""
    });

    const [message, setMessage] = useState('');
    const [isTrue, setIstrue] = useState(false);
    useEffect(()=>{

        annonceServices.getAnnonce(idannonce)
        .then(res=>{
          setAnnonces(res.data);
          console.log(res.data);
          
        })
        .catch(err=>{
          console.log(err.data)
        })
      
      }, [idannonce]);

    
    function handleChange(e){
      setAnnonces({
        ...annonces,
        [e.target.name]:e.target.value,
      })
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      annonceServices.updateAnnonce(idannonce,annonces)
        .then(res => {console.log(res.data)
        setMessage("actualité a ete modufiee")
          setIstrue(true)

        })
        .catch(err =>{ console.log(err.data)
          setMessage(" Erreur l'ors de la modification de l'actualité")
          setIstrue(false)
        });
      }
    
    
    return (
      <section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
      <div className='add-content'>
          <div className='title-add-filier'>
            <h2 className="lora-myuniqueclass">Modifier un annonce  </h2>
          </div>
          {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

          <form onSubmit={handleSubmit} className='form-add-filier'>
            <input className='input-add-filier' type='text' name='titre' placeholder='titre de l annonces...' value={annonces.titre} onChange={handleChange} />
            <input className='input-add-filier' type='text' name='description' placeholder='descreption de l annonce...' value={annonces.description} onChange={handleChange} />
            <input className='input-add-annonce-date' type='date' name='datePublication' placeholder='date de l annonce ...' value={annonces.datePublication} onChange={handleChange} />
            <button className='btnadd'>Modifier</button>
          </form>
        </div>
      </section>
    );
    }