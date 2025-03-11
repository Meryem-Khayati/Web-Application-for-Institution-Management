import React, { useState } from 'react';
import { semestreServices } from '../../services/semestreServices';
import { useParams } from 'react-router-dom';

export default function AddSemestre() {
  const params = useParams();
  const idFilier = params.id;

  const [message, setMessage] = useState('');
  const [isTrue, setIstrue] = useState(false);

  const [semestre, setSemestre] = useState({
    nom: "",
    anneeUniversitaire: ""
  });

  function resetData() {
    setSemestre({
      nom: "",
      anneeUniversitaire: ""
    });
  }

  function handleChange(e) {
    setSemestre({
      ...semestre,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm() {
    const { nom, anneeUniversitaire } = semestre;

    if (!nom.trim() || !anneeUniversitaire.trim()) {
      setMessage("Les champs ne doivent pas être vides ou contenir seulement des espaces.");
      setIstrue(false);
      return false;
    }

    // Vérifier le format de l'année universitaire
    const anneeRegex = /^\d{4}-\d{4}$/;
    if (!anneeRegex.test(anneeUniversitaire)) {
      setMessage("L'année universitaire doit être au format 'YYYY-YYYY', par exemple '2023-2024'.");
      setIstrue(false);
      return false;
    }

    // Autres validations peuvent être ajoutées ici si nécessaire

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    semestreServices.ajouterSemestre(idFilier, semestre)
      .then(res => {
        if (res.data.erreur) {
          setMessage(res.data.erreur);
          setIstrue(false);
        } else {
          console.log(res.data);
          setMessage(res.data.message);
          setIstrue(true);
          resetData();
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Erreur lors de l'ajout du semestre");
        setIstrue(false);
      });
  }

  return (
    <section className='admin-add-filier-container'>
      <div className='add-content'>
        <div className='title-add-filier'>
          <h2> Ajouter Semestre </h2>
        </div>
        {message && <p className={isTrue ? "true" : "false"}>{message}</p>}
        <form onSubmit={handleSubmit} className='form-add-filier'>
        <select className='input-add-filier' name='nom' value={semestre.nom} onChange={handleChange} required>
            <option value="">Choisissez le semestre</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
            <option value="S4">S4</option>
          </select>
          <input className='input-add-filier' type='text' name='anneeUniversitaire' placeholder='Annee universitaire ...' value={semestre.anneeUniversitaire} onChange={handleChange} required />
          <button className='btnadd'>Ajouter</button>
        </form>
      </div>
    </section>
  );
}
