import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { annonceServices } from '../../services/annonceServices';

export default function ListAnnonce() {
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState([]);
  const [annonceToDelete, setAnnonceToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    annonceServices.getAllAnnonces()
      .then(res => {
        setAnnonces(res.data);
      })
      .catch(err => {
        console.log("Erreur lors de la récupération des annonces : ", err);
      });
  };

  function modifier(idannonce) {
    navigate(`/dashboard/annonces/${idannonce}`);
  }

  function supprimer(idannonce) {
    setAnnonceToDelete(idannonce);
    setShowDialog(true);
  }

  function confirmDelete() {
    annonceServices.deleteAnnonce(annonceToDelete)
      .then(res => {
        setAnnonces(current => current.filter(annonce => annonce.id !== annonceToDelete));
        setShowDialog(false);
        setMessage('Annonce supprimée avec succès.');
        setMessageType('success');
        
      })
      .catch(err => {
        console.log("Erreur lors de la suppression de l'annonce : ", err);
        setMessage('Erreur lors de la suppression de l\'annonce.');
        setMessageType('error');
      });
  }

  function voir(idannonce) {
    navigate(`/dashboard/annonces/${idannonce}/fichiers`);
  }

  const listAnnonces = annonces.map(element => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.titre}</td>
      <td>{element.description}</td>
      <td>{element.datePublication}</td>
      <td><FontAwesomeIcon icon={faEye} onClick={() => voir(element.id)} /></td>
      <td><i className='bx bxs-edit-alt' onClick={() => modifier(element.id)}></i></td>
      <td><i className='bx bxs-trash' onClick={() => supprimer(element.id)}></i></td>
    </tr>
  ));

  return (
    <div className='admin-dashboard-container'>
      <section className='admin-list-data'>
        <div className='admin-list-tab-container'>
          <div className="admin-info-tab">
            <h3>Liste des Actualités</h3>
            <button className='list-add-element'>
              <Link to={`/dashboard/annonces/add`}>Ajouter Actualité</Link>
            </button><br />
          </div>
          {message && (
            <div className={`notification ${messageType}`}>
              {message}
            </div>
          )}
          <table className='admin-tab'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Date de Publication</th>
                <th>Voir les fichiers de l'actualité</th>
                <th>Éditer</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {listAnnonces}
            </tbody>
          </table>
        </div>
      </section>
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer cette actualité ?</p>
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
