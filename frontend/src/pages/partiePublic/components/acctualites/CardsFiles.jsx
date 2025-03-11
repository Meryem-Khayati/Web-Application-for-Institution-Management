import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fileServices } from '../../../services/fileServices';
import { annonceServices } from '../../../services/annonceServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export default function CardsFiles() {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [annonce,setAnnonce]=useState({});

  useEffect(() => {
    fileServices.getAllFiles(id)
      .then(res => {
        setFiles(res.data);
      })
      .catch(err => {
        console.log(err);
      });
      annonceServices.getAnnonce(id)
      .then(res=>setAnnonce(res.data))
      .catch(err=>console.log(err))
  }, [id]);

  return (
    <div className='annonce-data'>
      <div className="annonce-header-data">
        <h1 className="acct">{annonce.titre}</h1>
        <p className="des-annonce-data">{annonce.description}</p>
        <p className="date-annonce-data"><FontAwesomeIcon icon={faCalendarDays} className='date-econ' />{annonce.datePublication}</p>
      </div>
      <div>
      {files.length === 0 ? (
        <p>Aucun fichier disponible pour cette annonce.</p>
      ) : (
        files.map(file => (
          <div key={file.id} className="file-annonces-container">
            {file.type === 'vidio' && file.file && <video controls className='vido-annonce'>
              <source src={`data:video/mp4;base64,${file.file}`} type="video/mp4" />
            </video>}
            {file.type === 'image' && file.file && <img src={`data:image/png;base64,${file.file}`} alt="" className='image-annonce' />}
          </div>
        ))
      )}
      </div>

    </div>
  );
};
