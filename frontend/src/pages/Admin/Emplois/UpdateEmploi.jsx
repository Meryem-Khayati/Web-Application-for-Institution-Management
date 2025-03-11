import React, { useEffect, useState } from 'react';
import { emploiServices } from '../../services/emploiServices';
import { useParams } from 'react-router-dom';

export default function UpdateEmploi() {
  const idFilier = useParams().idFilier;
  const idSemestre = useParams().idsemestre;
  const id = useParams().id;

  const [message, setMessage] = useState('');

  const [isTrue, setIstrue] = useState(false);
  const [emploi, setEmploi] = useState(null); 

  useEffect(() => {
    emploiServices.getEmploi(idFilier, idSemestre, id)
      .then(res => {
        console.log(res.data);
        setEmploi(res.data.file);
        console.log(emploi)
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append('file', emploi); 
    console.log(formData)
    emploiServices.updateEmploi(idFilier, idSemestre, id, formData) 
      .then(res => {
        console.log(res.data);
        setMessage(res.data.message);
        setIstrue(true);
      })
      .catch(err => {
        console.log(err);
        setMessage(err.data.erreur);
        setIstrue(false)
      });
  }

  return (
    <section id='admin-add-filier-container-etudiant'  className='admin-add-filier-container'>
    <div className='add-content'>
        <div className='title-add-filier'>
            <h2 className="lora-myuniqueclass">Modifier Emploi de temps</h2>
        </div>
        {message && <p className={isTrue ? "true" : "false"}>{message}</p>}
        <form onSubmit={handleSubmit} className='form-add-filier'>
            <label className="label-file-upload">
          <input id='file-upload' type='file' name='emploi' onChange={(e) => setEmploi(e.target.files[0])} />
          Choisissez l'emploi de temps
          </label>
                    <button type="submit" className='btnadd'>Modifier</button>
                </form>
            </div>
        </section>
    );
};
