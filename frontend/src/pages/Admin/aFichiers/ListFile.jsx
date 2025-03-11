import React, { useEffect, useState } from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { fileServices } from '../../services/fileServices';

export default function ListFile() {
  const { idannonce } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fileServices.getAllFiles(idannonce)
      .then(res => {
        setFiles(res.data);
      })
      .catch(err => {
        console.log("Erreur lors de la récupération des fichiers : ", err);
      });
  }, [idannonce]);

  function modifier(idfile) {
    navigate(`/dashboard/annonces/${idannonce}/fichiers/${idfile}`);
  }

  function supprimer(idfile) {
    setFileToDelete(idfile);
    setShowDialog(true);
  }

  function confirmDelete() {
    fileServices.deleteFile(idannonce, fileToDelete)
      .then(res => {
        setFiles(current => current.filter(file => file.id !== fileToDelete));
        setShowDialog(false);
        setMessage('Fichier supprimé avec succès.');
        setMessageType('success');
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 3000); // Hide message after 3 seconds
      })
      .catch(err => {
        console.log("Erreur lors de la suppression du fichier : ", err);
        setMessage('Erreur lors de la suppression du fichier.');
        setMessageType('error');
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 3000); // Hide message after 3 seconds
      });
  }

  function voir(type, idfile) {
    navigate(`/dashboard/annonces/${idannonce}/fichiers/${idfile}/show/?type=${type}`);
  }

  const listFiles = files.map(file => (
    <tr key={file.id}>
      <td>{file.id}</td>
      <td>{file.type}</td>
      <td><FontAwesomeIcon icon={faEye} onClick={() => voir(file.type, file.id)} /></td>
      <td><i className='bx bxs-edit-alt' onClick={() => modifier(file.id)}></i></td>
      <td><i className='bx bxs-trash' onClick={() => supprimer(file.id)}></i></td>
    </tr>
  ));

  return (
    <div className='admin-dashboard-container'>
      <section className='admin-list-data'>
        <div className='admin-list-tab-container'>
          <div className="admin-info-tab">
            <h3>Liste des fichiers de l'annonce</h3>
            <button className='list-add-element'>
              <Link to={`/dashboard/annonces/${idannonce}/fichiers/add`}>Ajouter un fichier</Link>
            </button><br />
          </div>
          <table className='admin-tab'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Type</th>
                <th>Voir</th>
                <th>Éditer</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {listFiles}
            </tbody>
          </table>
        </div>
      </section>
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer ce fichier ?</p>
            <button onClick={confirmDelete}>Confirmer</button>
            <button onClick={() => setShowDialog(false)}>Annuler</button>
          </div>
        </div>
      )}
      {message && (
        <div className={`notification ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
}
