import React, { useState, useEffect } from 'react';
import { demandeServices } from '../../services/demandeServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function ListReclamation() {
    const [reclamations, setReclamations] = useState([]);
    const [filtre, setFiltre] = useState('toutes'); 
    const [reclamationToDelete, setReclamationToDelete] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        demandeServices.getAllReclamations()
            .then(res => {
                setReclamations(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    function Accepter(id) {
        navigate(`/dashboard/reclamations/${id}`);
    }

    function refuser(id) {
        navigate(`/dashboard/reclamations/${id}/refuser`);
    }

    function supprimer(reclamationId) {
        setReclamationToDelete(reclamationId);
        setShowDialog(true);
    }

    function confirmDelete() {
        demandeServices.supprimerReclamation(reclamationToDelete)
            .then(res => {
                setReclamations(current => current.filter(reclamation => reclamation.idrec !== reclamationToDelete));
                setShowDialog(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const listReclamations = reclamations
        .filter(reclamation => filtre === 'toutes' || reclamation.statut === filtre) 
        .map(rec => (
            <tr key={rec.idrec}>
                <td>{rec.idrec}</td>
                <td>{rec.dateReclamation}</td>
                <td>{rec.typeDocument}</td>
                <td>{rec.etudiant.username}</td>
                <td>{rec.etudiant.apogee}</td>
                <td>{rec.etudiant.cin}</td>
                <td>{rec.message}</td>
                <td>{rec.statut}</td>
                <td><FontAwesomeIcon icon={faCheck} style={{ color: "#009500" }} onClick={() => { Accepter(rec.idrec) }} /></td>
                <td><FontAwesomeIcon icon={faTimes} style={{ color: "#ff0000" }} onClick={() => { refuser(rec.idrec) }} /></td>
                <td><i className='bx bxs-trash' onClick={() => supprimer(rec.idrec)}></i></td>
            </tr>
        ));

    return (
        <div className='admin-dashboard-container'>
            <section className='admin-list-data'>
                <div className='admin-list-tab-container'>
                    <div className="admin-info-tab">
                        <h3>List des réclamations</h3>
                        <div>
                            <button className='list-add-element' onClick={() => setFiltre('toutes')}>Toutes</button>
                            <button className='list-add-element' onClick={() => setFiltre('accepté')}>Acceptées</button>
                            <button className='list-add-element' onClick={() => setFiltre('refusé')}>Refusées</button>
                            <button className='list-add-element' onClick={() => setFiltre('en attente')}>en attente</button>
                        </div>
                    </div>

                    <table className='admin-tab'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date de Réclamation</th>
                                <th>Type de Document</th>
                                <th>Nom utilisateur</th>
                                <th>Apogee</th>
                                <th>CIN</th>
                                <th>Message</th>
                                <th>Statut</th>
                                <th>Accepter</th>
                                <th>Refuser</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listReclamations}
                        </tbody>
                    </table>
                </div>
            </section>
            {showDialog && (
                <div className="confirmation-dialog">
                    <div className="dialog-content">
                        <p>Êtes-vous sûr de vouloir supprimer cette réclamation ?</p>
                        <button onClick={confirmDelete}>Confirmer</button>
                        <button onClick={() => setShowDialog(false)}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
}
