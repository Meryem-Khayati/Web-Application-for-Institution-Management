import React, { useState } from 'react';
import {fileServices} from '../../services/fileServices';
import { useParams } from 'react-router-dom';

export default function AddFile() {
   const [file,setFile]=useState(null)
   const [type,setType]=useState("")
 const idannonce = useParams().idannonce;
 const [message, setMessage] = useState('');
 const [isTrue, setIstrue] = useState(false);
 function resetData(){
  setFile(null);
  setType("");

}
  
  function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      fileServices.ajouterFile(idannonce,formData)
          .then(res => {
              console.log("fichier ajoutée : ", formData);
              console.log(res.data);
              setMessage(res.data.message);
              setIstrue(true);
              resetData();

          })
          .catch(err => {
            console.log(err.data);
            setMessage(err);
                setIstrue(false)
          });
  }
  
  return (
    <section className='admin-add-filier-container'>
      <div className='add-content'>
        <div className='title-add-filier'>
                  <h2 className="lora-myuniqueclass">Ajouter un fichier pour l'annonce</h2>
              </div>
              {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

              <form onSubmit={handleSubmit} className='form-add-filier'>
              <input className='input-add-annonce-date' type="text" name='type' onChange={(e)=>{setType(e.target.value)}} placeholder=" le type de fichier de la annoce" required />
              <label className="label-file-upload">
              <input  id='file-upload' type="file" name='file' onChange={(e)=>{setFile(e.target.files[0])}} placeholder="fichier de la annoce" required />
              Choisissez un fichier
                    </label>
                  <button type="submit" className='btnadd'>Ajouter</button>
              </form>
          </div>
      </section>
  );
  };
  