import React, { useEffect, useState } from 'react';
import { noteServices } from '../../services/noteServices';
import { useParams } from 'react-router-dom';


export default function UpdateNote() {
  const [message, setMessage] = useState('');
  const [isTrue, setIstrue] = useState(false);
    const idfilier = useParams.idfilier;
    const idsemestre = useParams().idsemestre;
    const idmodule = useParams().idmodule;
    const idnote = useParams().idnote;
    const apogee = useParams().apogee;

    const [note, setNote] = useState({
        valeur: null,
        
      });

      useEffect(()=>{
        noteServices.getNote(idfilier,idsemestre,idmodule,idnote)
        .then((res)=>{console.log(res.data);
                      setNote(res.data);})
        .catch((err)=>{console.log(err.data)})

      },[idnote])
      console.log(note)
      function handleChange(e){
        setNote({
          ...note,
          [e.target.name]:e.target.value,
        })
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('apogee', apogee);
        formData.append('note', note.valeur);
        noteServices.updateNote(idfilier,idsemestre,idmodule,idnote,formData)
        .then(res => {console.log(res.data)
          setMessage(res.data.message);
          setIstrue(true);
        })
        .catch(err => {console.log(err.data)
          setMessage("Erreur lors de la modification de la note");
      setIstrue(false)
        });
      };

      return (
<section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
  <div className='add-content'>
      <div className='title-add-filier'>
              <h2 className="">Modifie une note</h2>
            </div>
            {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

            <form onSubmit={handleSubmit} className='form-add-filier'>
              <input className='input-add-filier input-add-module' type='text' name='valeur' placeholder='note du module...' value={note.valeur} onChange={handleChange} required />
              <button className='btnadd'>Modifier</button>
            </form>
          </div>
        </section>
      );
      }