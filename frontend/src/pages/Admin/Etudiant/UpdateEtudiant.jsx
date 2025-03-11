import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { etudiantServices } from '../../services/etudiantServices';



export default function UpdateEtudiant() {
  const [isTrue, setIstrue] = useState(false);
  const [message, setMessage] = useState('');

  const idfilier = useParams().idfilier;
const idsemestre= useParams().idsemestre;
const id =useParams().id;
console.log(useParams())
console.log(idfilier)
console.log(idsemestre)

  let navigate=useNavigate()
 const [etudiant, setEtudiant] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    apogee: "",
    cin: "",
    cne: "",
    dateNaissance: "",
    role: "ETUDIANT",
  
  }); 
 
  

  useEffect(()=>{

    etudiantServices.getEtudiant(idfilier,idsemestre,id)
    .then(res=>{
      setEtudiant(res.data);
      console.log(res.data);
      
    })
    .catch(err=>{
      console.log(err.data)
    })

  }, [id]);


  function handleChange(e){
    setEtudiant({
      ...etudiant,
      [e.target.name]:e.target.value,
    })
  }
  

  function handleSubmit(e){
    e.preventDefault();
    etudiantServices.updateEtudiant(idfilier,idsemestre,id,etudiant)
     .then(res=>{
      console.log(res.data)
      setMessage(res.data.message);
      setIstrue(true);
    })
     .catch(err=>{console.log(err.data)
      setMessage("Erreur lors de la modification  de l'étudiant");
      setIstrue(false)
     })
    
    }
    
    return (
      <section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
      <div className='add-content'>
          <div className='title-add-filier'>
                <h3 className="">Modifier Etudiant</h3>
              </div>
              {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

              <form onSubmit={handleSubmit} className='form-add-filier'>
          <input className='input-add-filier' type='text' name='firstName' placeholder='Prénom...' value={etudiant.firstName} onChange={handleChange} required/>
          <input className='input-add-filier' type='text' name='lastName' placeholder='Nom...' value={etudiant.lastName} onChange={handleChange} required/>
          <input className='input-add-filier' type='email' name='username' placeholder='Nom d utilisateur...' value={etudiant.username} onChange={handleChange} required/>
          <input className='input-add-filier' type='password' name='password' placeholder='Mot de passe...' value={etudiant.password} onChange={handleChange} />
          <input className='input-add-filier' type='number' name='apogee' placeholder='Apogee...' value={etudiant.apogee} onChange={handleChange} required/>
          <input className='input-add-filier' type='text' name='cin' placeholder='CIN...' value={etudiant.cin} onChange={handleChange} required/>
          <input className='input-add-filier' type='text' name='cne' placeholder='CNE...' value={etudiant.cne} onChange={handleChange} required />
          <input className='input-add-filier' type='date' name='dateNaissance' value={etudiant.dateNaissance} onChange={handleChange} required/>
         
          <button className='btnadd'>Modifier</button>
        </form>
          </div>
      </section>
    )
  }
