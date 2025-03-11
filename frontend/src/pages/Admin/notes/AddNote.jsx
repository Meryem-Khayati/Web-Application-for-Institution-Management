import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { noteServices } from '../../services/noteServices';

export default function AddNote() {
  const [message, setMessage] = useState('');
  const [isTrue, setIstrue] = useState(false);
 const idfilier = useParams().idfilier;
const idsemestre = useParams().idsemestre;
const idmodule = useParams().idmodule;
console.log(idmodule)

const [note, setNote] = useState({
    apogee:"",
    valeur: null,
  });

function handleChange(e){
    setNote({
      ...note,
      [e.target.name]:e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('apogee', note.apogee);
    formData.append('note', note.valeur);
    console.log(formData)
    noteServices.ajouterNote(idfilier,idsemestre,idmodule,formData)
    .then(res => {console.log(res.data)
      setMessage(res.data.message);
      setIstrue(true);
    })
    .catch(err => {console.log(err.data)
      setMessage("Erreur lors de l'ajout de la note");
      setIstrue(false)
    });
  };
  


return (
  <section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
  <div className='add-content'>
      <div className='title-add-filier'>
          <h2 className="">Ajouter une note</h2>
        </div>
        {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

        <form onSubmit={handleSubmit} className='form-add-filier'>
          <input className='input-add-filier' type='number' name='apogee' placeholder='Apogee d etudiant...' value={note.nom} onChange={handleChange} required />
          <input className='input-add-filier' type='text' name='valeur' placeholder='note du module...' value={note.valeur} onChange={handleChange} required/>
          <button className='btnadd'>Ajouter</button>
        </form>
      </div>
    </section>
  );
  }