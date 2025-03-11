import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { semestreServices } from '../../services/semestreServices';

export default function ListesSemestre() {
  const params = useParams();
  const idFilier = params.id;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const annee = searchParams.get('annee');
  const navigate = useNavigate();
  const [semestre, setSemestre] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [semestreToDelete, setSemestreToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error

  useEffect(() => {
    semestreServices.getAllSemestre(idFilier, annee)
      .then(res => {
        setSemestre(res.data);
      })
      .catch(err => {
        console.log("Erreur lors de la récupération de la liste des semestres : ", err);
      });
  }, [idFilier, annee]);

  function modifier(sid) {
    navigate(`./updatesemestre/${sid}`);
  }

  function Ajouter() {
    navigate(`/dashboard/addsemestre/filiers/${idFilier}`);
  }

  function supprimer(semestreId) {
    setSemestreToDelete(semestreId);
    setShowDialog(true);
  }

  function confirmDelete() {
    semestreServices.deleteSemestre(idFilier, semestreToDelete)
      .then(res => {
        setSemestre(current => current.filter(sem => sem.id !== semestreToDelete));
        setShowDialog(false);
        setMessage('Le semestre a été supprimé avec succès.');
        setMessageType('success');
        setTimeout(() => setMessage(''), 10000); // Hide message after 3 seconds
        setSemestreToDelete(null);
      })
      .catch(err => {
        console.log("Erreur lors de la suppression du semestre : ", err);
        setShowDialog(false);
        setMessage('Erreur lors de la suppression du semestre.');
        setMessageType('error');
        setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds
      });
  }

  const listSemestre = semestre.map(sem => (
    <tr key={sem.id}>
      <td>{sem.id}</td>
      <td>{sem.nom}</td>
      <td>{sem.anneeUniversitaire}</td>
      <td><i className='bx bxs-edit-alt' onClick={() => modifier(sem.id)}></i></td>
      <td><i className='bx bxs-trash' onClick={() => supprimer(sem.id)}></i></td>
    </tr>
  ));

  return (
    <div className='admin-dashboard-container'>
      <section className='admin-list-data'>
        <div className='admin-list-tab-container'>
          <div className="admin-info-tab">
            <h3>Liste des Semestres</h3>
            <button className='list-add-element' onClick={Ajouter}>Ajouter Semestre</button><br />
          </div>
          <table className='admin-tab'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Semestre</th>
                <th>Année Universitaire</th>
                <th>Éditer</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {listSemestre}
            </tbody>
          </table>
        </div>
      </section>
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer ce semestre ?</p>
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
