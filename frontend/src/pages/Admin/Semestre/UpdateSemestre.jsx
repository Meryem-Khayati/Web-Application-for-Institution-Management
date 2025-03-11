import React, { useEffect, useState } from 'react'
import { semestreServices } from '../../services/semestreServices';
import { useParams } from 'react-router-dom';

export default function UpdateSemestre() {
  
 console.log(useParams())
  const idSemestre = useParams().uid
  const idFilier = useParams().id
  console.log("semstre id  "+idSemestre)
  console.log("id filier "+idFilier)
  const [message, setMessage] = useState('');

  const [isTrue, setIstrue] = useState(false);
    const [semestre,setSemestre]=useState({
        nom:"",
        anneeUniversitaire:"",
    })

     useEffect(()=>{
      semestreServices.getSemestre(idFilier,idSemestre)
      .then(res=>{
        setSemestre(res.data)
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err.data)
      })
     },[idSemestre])

    function handleChange(e){
        setSemestre({
            ...semestre,
            [e.target.name]:e.target.value,
        })}

     function handleSubmit(e){
            e.preventDefault();
            semestreServices.updateSemestre(idFilier,idSemestre, semestre)
            .then(res => {
              if (res.data.erreur) {
                setMessage(res.data.erreur);
                setIstrue(false);
              } else {
                console.log(res.data);
                setMessage(res.data.message);
                setIstrue(true);
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
          <h2> Modifier Semestre </h2>
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
          <input className='input-add-filier' type='text' name='anneeUniversitaire' placeholder=' annee unoversitaire...' value={semestre.anneeUniversitaire} onChange={handleChange} required />
          <button className='btnadd'>Modifier</button>
        </form>
      </div>
    </section>
      );
    }