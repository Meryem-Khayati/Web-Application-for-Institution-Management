import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { noteServices } from '../../services/noteServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import { moduleServices } from '../../services/moduleServices';


export default function ListNotesM() {
  const navigate = useNavigate();
  const { idfilier, idsemestre, idmodule } = useParams();
  const [notes, setNotes] = useState([]);
  const [valeur, setValeur] = useState("");
  const [currentEtudiant, setCurrentEtudiant] = useState(null); 
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [modules, setModules] = useState([]);


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const module = searchParams.get('name');
  


  useEffect(() => {
    noteServices.getAllNotesWitheEtd(idfilier, idsemestre, idmodule)
      .then(res => {
        setNotes(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des notes :", err);
      });

  }, [idfilier, idsemestre, idmodule]);


  const modifier = ( apogee, idnote) => {
    navigate(`/dashboard/filieress/${idfilier}/semestres/${idsemestre}/modules/${idmodule}/etudiant/${apogee}/notes/${idnote}`);
  };

  function supprimer(noteId) {
    setNoteToDelete(noteId);
    setShowDialog(true);
  }

  function confirmDelete() {
    noteServices.deleteNote(idfilier, idsemestre, idmodule, noteToDelete)
      .then(res => {
        setNotes(current => current.filter(note => note.id !== noteToDelete));
        setShowDialog(false);
        setMessage('La note a été supprimée avec succès.');
        setMessageType('success');
        setTimeout(() => setMessage(''), 3000); 
      })
      .catch(err => {
        setShowDialog(false);
        setMessage('Erreur lors de la suppression de la note.');
        setMessageType('error');
        setTimeout(() => setMessage(''), 3000); 
      });
  }

  const handleAjouterClick = (etudiant) => {
    setCurrentEtudiant(etudiant); 
  };

  const ajouterNote = (e) => {
    e.preventDefault();
    if (!currentEtudiant) return;

    const formData = new FormData();
    formData.append('apogee', currentEtudiant.apogee);
    formData.append('note', valeur);

    noteServices.ajouterNote(idfilier, idsemestre, idmodule, formData)
      .then(res => {
        setNotes(current => current.map(note => {
          if (note.apogee === currentEtudiant.apogee) {
            return { ...note, note: valeur };
          }
          return note;
        }));
        setCurrentEtudiant(null); 
        setValeur(""); 
        setMessage('La note a été ajoutée avec succès.');
        setMessageType('success');
        setTimeout(() => setMessage(''), 13000);
      })
      .catch(err => {
        setMessage('Erreur lors de l\'ajout de la note.');
        setMessageType('error');
        setTimeout(() => setMessage(''), 13000);
      });
  };

  const listNotes = notes.map(note => (
    <tr key={note.id}>
      <td>{note.idnote}</td>
      <td>{note.apogee}</td>
      <td>{note.nom}</td>
      <td>{note.prenom}</td>
      <td>{note.note}</td>
      <td>
        {note.note === null ? (
          <FontAwesomeIcon icon={faPlus} onClick={() => handleAjouterClick(note)} />
        ) : (
          <FontAwesomeIcon icon={faPlus} style={{ color: 'grey', cursor: 'not-allowed' }} />
        )}
      </td>
      <td><i className='bx bxs-edit-alt' onClick={() => modifier(note.apogee,note.idnote)}></i></td>
      <td><i className='bx bxs-trash' onClick={() => supprimer(note.idnote)}></i></td>
    </tr>
  ));

  return (
    <div className='admin-dashboard-container'>
      <section className='admin-list-data'>
        <div className='admin-list-tab-container'>
          <div className="admin-info-tab">
            <h3>Liste des Notes du module {module}</h3>
            <br />
          </div>
          <table className='admin-tab'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Apogée</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Note</th>
                <th>Ajouter</th>
                <th>Éditer</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {listNotes}
            </tbody>
          </table>
        </div>
      </section>
      {currentEtudiant && (
        <div className="dialog-overlay">
          <form onSubmit={ajouterNote} className='dialog-form'>
            <h3>Ajouter une note</h3>
            <input
              type='text'
              name='valeur'
              placeholder='Note du module...'
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              required
            />
            <button className='ajouterNote'>Ajouter</button>
          </form>
        </div>
      )}
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer cette note ?</p>
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
