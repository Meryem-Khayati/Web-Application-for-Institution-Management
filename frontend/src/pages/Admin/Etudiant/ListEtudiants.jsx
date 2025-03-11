import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { etudiantServices } from '../../services/etudiantServices';

export default function ListEtudiants() {
  let navigate = useNavigate();
  
  const { idfilier, idsemestre } = useParams();
  console.log({ idfilier, idsemestre });

  const [etudiants, setEtudiants] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [etudiantToDelete, setEtudiantToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    etudiantServices.getAllEtudiants(idfilier, idsemestre)
      .then(res => {
        setEtudiants(res.data);
      })
      .catch(err => {
        console.log("Erreur lors de la récupération des étudiants : ", err);
      });
  }, [idfilier, idsemestre]);

  function modifier(idfilier, idsemestre, eid) {
    navigate(`/dashboard/filiers/${idfilier}/semestres/${idsemestre}/etudiant/${eid}`);
  }

  function supprimer(uid) {
    setEtudiantToDelete(uid);
    setShowDialog(true);
  }

  function confirmDelete() {
    etudiantServices.deleteEtudiant(idfilier, idsemestre, etudiantToDelete)
      .then(res => {
        setEtudiants(current => current.filter(etd => etd.id !== etudiantToDelete));
        setShowDialog(false);
        setEtudiantToDelete(null);
        setMessage('Étudiant supprimé avec succès.');
        setMessageType('success');
      })
      .catch(err => {
        console.log("Erreur lors de la suppression de l'étudiant : ", err);
        setShowDialog(false);
        setMessage('Erreur lors de la suppression de l\'étudiant.');
        setMessageType('error');
      });
  }

  const listEtudiants = etudiants.map(etd => (
    <tr key={etd.id}>
      <td>{etd.id}</td>
      <td>{etd.firstName}</td>
      <td>{etd.lastName}</td>
      <td>{etd.username}</td>
      <td>{etd.apogee}</td>
      <td>{etd.cin}</td>
      <td>{etd.cne}</td>
      <td>{etd.dateNaissance}</td>
      <td><i className='bx bxs-edit-alt' onClick={() => modifier(idfilier, idsemestre, etd.id)}></i></td>
      <td><i className='bx bxs-trash' onClick={() => supprimer(etd.id)}></i></td>
    </tr>
  ));

  return (
    <div className='admin-dashboard-container'>
      <section className='admin-list-data'>
        <div className='admin-list-tab-container'>
          <div className="admin-info-tab">
            <h3>Liste des étudiants</h3>
            <button className='list-add-element'>
              <Link to={`/dashboard/filiers/${idfilier}/semestres/${idsemestre}/etudiant`}>Ajouter Étudiant</Link>
            </button><br />
          </div>
          <table className='admin-tab'>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Name</th>
                <th>Apogee</th>
                <th>CIN</th>
                <th>CNE</th>
                <th>Date de Naissance</th>
                <th>Éditer</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {listEtudiants}
            </tbody>
          </table>
        </div>
      </section>
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>
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
