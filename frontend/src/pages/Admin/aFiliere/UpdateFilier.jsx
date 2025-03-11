import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { filierServices } from '../../services/filierServices';

export default function UpdateFilier() {
  const [message, setMessage] = useState('');
  const [isTrue, setIstrue] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const { uid } = useParams();
  const [filier, setFilier] = useState({
    nom: "",
    descreption: "",
    image: null,
  });


  useEffect(() => {
    filierServices.getFilier(uid)
      .then(res => {
        setFilier(res.data);
        setCurrentImage(res.data.image)

      })
      .catch(err => { console.log(err); });
  }, [uid]);

  function handleChange(e) {
    const { name, value, files } = e.target;
  
    if (name === "image") {
      setFilier({
        ...filier,
        image: files[0],
      });
      setSelectedImage(URL.createObjectURL(files[0])); // Met à jour l'URL de l'image sélectionnée
    } else {
      setFilier({
        ...filier,
        [name]: value
      });
    }
  }
  

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nom', filier.nom);
    formData.append('descreption', filier.descreption);

    if (filier.image) {
      formData.append('image', filier.image);
    }

    filierServices.updateFilier(uid, formData)
      .then(res => {
        console.log("Filière modifiée : ", formData);
        console.log(res.data);
        setIstrue(true);
        setMessage("Filière modifiée avec succès");
      })
      .catch(err => {
        console.error("Erreur lors de la modification de la filiere");
        setIstrue(false);
        setMessage("Erreur lors de la modification de la filiere");
      });
  }




  return (
    <section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
      <div className='add-content'>
        <div className='title-add-filier'>
          <h2>Modifier Filière</h2>
        </div>
        {message && <p className={isTrue ? "true" : "false"}>{message}</p>}
        <form onSubmit={handleSubmit} className='form-add-filier'>
          <input className='input-add-filier' type="text" name='nom' value={filier.nom} onChange={handleChange} placeholder="Nom de la filière" required />
          <input className='input-add-filier' type="text" name='descreption' value={filier.descreption} onChange={handleChange} placeholder="Description de la filière" required />
          
            <div>
            <img src={selectedImage || `data:image/jpeg;base64,${currentImage}`} alt="Current" style={{ width: '100px', height: '100px' }} />
            </div>
      
          <label className="label-file-upload">
            <input id="file-upload" type="file" name="image" onChange={handleChange} />
            Choisissez une image pour la Filière (optionnel)
          </label>
          <button type="submit" className='btnadd'>Modifier</button>
        </form>
      </div>
    </section>
  );
}
