import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { filierServices } from '../../services/filierServices';

export default function ListFiliers() {
  const [filier, setFilier] = useState([]);
  const [filierToDelete, setFilierToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 

  let navigate = useNavigate();

  useEffect(() => {
    filierServices.getAllFilier()
      .then(res => {
        setFilier(res.data);
      })
      .catch(err => console.log("Erreur lors de la récupération de la liste des filières : " + err));
  }, []);

  function modifier(uid) {
    navigate(`./updatefilier/${uid}`);
  }

  function supprimer(filierId) {
    setFilierToDelete(filierId);
    setShowDialog(true);
  }

  function confirmDelete() {
    filierServices.deleteFilier(filierToDelete)
      .then(res => {
        setFilier(current => current.filter(fil => fil.id !== filierToDelete));
        setShowDialog(false);
        setMessage('La filière a été supprimée avec succès.');
        setMessageType('success');
        setTimeout(() => setMessage(''), 10000); 
      })
      .catch(err => {
        setShowDialog(false);
        setMessage('Erreur lors de la suppression de la filière.');
        setMessageType('error');
        setTimeout(() => setMessage(''), 3000); 
      });
  }

  const listFilieres = filier.map((filiere) => (
    <tr key={filiere.id}>
      <td>{filiere.id}</td>
      <td>{filiere.nom}</td>
      <td>{filiere.descreption}</td>
      <td><i className='bx bxs-edit-alt' onClick={() => modifier(filiere.id)}></i></td>
      <td><i className='bx bxs-trash' onClick={() => supprimer(filiere.id)}></i></td>
    </tr>
  ));

  return (
    <div className='admin-dashboard-container'>
      <section className='admin-list-data'>
        <div className='admin-list-tab-container'>
          <div className="admin-info-tab">
            <h3>Liste des Filières</h3>
            <button className='list-add-element'>
              <Link to='/dashboard/filier/addfilier'>Ajouter Filière</Link>
            </button><br />
          </div>
          <table className='admin-tab'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Éditer</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {listFilieres}
            </tbody>
          </table>
        </div>
      </section>
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer cette filière ?</p>
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
