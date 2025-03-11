import React, { useState } from 'react';
import { etudiantServices } from '../../services/etudiantServices';
import { useParams } from 'react-router-dom';
import { moduleServices } from '../../services/moduleServices';

export default function AddModule() {
const idfilier = useParams().idfilier;
const idsemestre = useParams().idsemestre;
const [message, setMessage] = useState('');

const [isTrue, setIstrue] = useState(false);
const [module, setModule] = useState({
  nom:"",
});

function handleChange(e){
  setModule({
    ...module,
    [e.target.name]:e.target.value,
  })
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(module);
  
  moduleServices.ajouterModule(idfilier,idsemestre, module)
    .then(res => {console.log(res.data)
      setMessage(res.data.message);
      setIstrue(true);
    })
    .catch(err => {console.log(err.data)
      setMessage("Erreur lors de l'ajout du module");
      setIstrue(false)
    });
};


return (
  <section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
    <div className='add-content'>
        <div className='title-add-filier'>
        <h2 className="">Ajouter un module </h2>
      </div>
      {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

      <form onSubmit={handleSubmit} className='form-add-filier'>
        <input className='input-add-filier input-add-module' type='text' name='nom' placeholder='nom du module...' value={module.nom} onChange={handleChange} required />
        <button className='btnadd'>Ajouter</button>
      </form>
    </div>
  </section>
);
}