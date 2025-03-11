import React, { useState,useEffect } from 'react';
import {fileServices} from '../../services/fileServices';
import { useParams } from 'react-router-dom';

export default function UpdateFile() {
    const idannonce = useParams().idannonce;
    const idfile = useParams().idfile;
    const [file,setFile]=useState(null)
    const [type,setType]=useState("")
    const [message, setMessage] = useState('');
  const [isTrue, setIstrue] = useState(false);
  
    useEffect(() => {
        fileServices.getFile(idannonce,idfile)
        .then(res => {
          console.log(res.data);
        //   setFile(res.data.file);
        //   console.log(file)
        setType(res.data.type)
        })
        .catch(err => {
          console.log(err.data);
        });
    }, [idfile]);
  
    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(); 
      formData.append('file', file); 
      formData.append('type', type); 
      console.log(formData)
      fileServices.updateFile(idannonce,idfile,formData) 
        .then(res => {
          setIstrue(true);
          setMessage("file modifiée avec succès");
        })
        .catch(err => {
          console.error("Erreur lors de la modification du fichie");
          setIstrue(false);
          setMessage("Erreur lors de la modification du fichie");
        });
    }
  
    return (
      <section className='admin-add-filier-container'>
      <div className='add-content'>
        <div className='title-add-filier'>
            <h2 className="lora-myuniqueclass">Modifier un fichier de l'annonce</h2>
          </div>
          {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

          <form onSubmit={handleSubmit} className='form-add-filier'>
          <label className="label-file-upload">
            <input  id='file-upload' type='file' name='file' onChange={(e) => setFile(e.target.files[0])} />
            Choisissez un fichier
          </label>
            <input className='input-add-annonce-date' type='text' name='type' value={type} onChange={(e) => setType(e.target.value)} placeholder='entrer le type'/>
            <button className='btnadd'>Modifier</button>
          </form>
        </div>
      </section>
    );
  }
  