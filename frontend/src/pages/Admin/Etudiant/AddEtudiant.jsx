import React, { useState } from 'react';
import { etudiantServices } from '../../services/etudiantServices';
import { useParams } from 'react-router-dom';

export default function AddEtudiant() {
  const idfilier = useParams().idfilier;
const idsemestre = useParams().idsemestre;
const [message, setMessage] = useState('');

const [isTrue, setIstrue] = useState(false);


  const [etudiant, setEtudiant] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    apogee: "",
    cin: "",
    cne: "",
    dateNaissance: "",
    role: "ETUDIANT"
  });
  function resetData(){
    setEtudiant({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      apogee: "",
      cin: "",
      cne: "",
      dateNaissance: "",
      role: "ETUDIANT"
    })

  }

  function handleChange(e){
    setEtudiant({
      ...etudiant,
      [e.target.name]:e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(etudiant);

    etudiantServices.ajouterEtudiant(idfilier,idsemestre, etudiant)
      .then(res => {console.log(res.data);
        setMessage(res.data.message);
        setIstrue(true);
        resetData();
      })
      .catch(err => {console.log("ereur"+err.data);
      setMessage("Erreur lors de l'ajout de l'étudiant");
      setIstrue(false)
      });
  };

  return (
    <section id='admin-add-filier-container-etudiant'  className='admin-add-filier-container'>
    <div className='add-content'>
        <div className='title-add-filier'>
          <h2>Ajouter un étudiant</h2>
        </div>
        {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

        <form onSubmit={handleSubmit} className='form-add-filier'>
          <input className='input-add-filier' type='text' name='firstName' placeholder='Prénom...' value={etudiant.firstName} onChange={handleChange} required/>
          <input className='input-add-filier' type='text' name='lastName' placeholder='Nom...' value={etudiant.lastName} onChange={handleChange} required/>
          <input className='input-add-filier' type='email' name='username' placeholder='Nom d utilisateur...' value={etudiant.username} onChange={handleChange} required/>
          <input className='input-add-filier' type='password' name='password' placeholder='Mot de passe...' value={etudiant.password} onChange={handleChange} required/>
          <input className='input-add-filier' type='number' name='apogee' placeholder='Apogee...' value={etudiant.apogee} onChange={handleChange} required/>
          <input className='input-add-filier' type='text' name='cin' placeholder='CIN...' value={etudiant.cin} onChange={handleChange} required/>
          <input className='input-add-filier' type='text' name='cne' placeholder='CNE...' value={etudiant.cne} onChange={handleChange}required />
          <input className='input-add-filier' type='date' name='dateNaissance' value={etudiant.dateNaissance} onChange={handleChange} required/>
          <button className='btnadd'>Ajouter</button>
        </form>
      </div>
    </section>
  );
}