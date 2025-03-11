import React, { useState, useEffect } from 'react';
import { demandeServices } from '../../services/demandeServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function ListDemandeEncour() {
    const [demandes, setDemandes] = useState([]);
    const [filtre, setFiltre] = useState('toutes');
    const [demandeToDelete, setDemandeToDelete] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success or error
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        demandeServices.getAllDemandes()
            .then(res => {
                setDemandes(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    function Accepter(id) {
        navigate(`/dashboard/demandes/${id}`);
    }

    function refuser(id) {
        navigate(`/dashboard/demandes/${id}/refuser`);
    }

    function supprimer(demandeId) {
        setDemandeToDelete(demandeId);
        setShowDialog(true);
    }

    function confirmDelete() {
        demandeServices.supprimerDemande(demandeToDelete)
            .then(res => {
                setDemandes(current => current.filter(demande => demande.idD !== demandeToDelete));
                setShowDialog(false);
                setMessage('La demande a été supprimée avec succès.');
                setMessageType('success');
                setTimeout(() => setMessage(''), 13000); // Hide message after 3 seconds
            })
            .catch(err => {
                setShowDialog(false);
                setMessage('Erreur lors de la suppression de la demande.');
                setMessageType('error');
                setTimeout(() => setMessage(''), 13000); // Hide message after 3 seconds
            });
    }

    const listDemandes = demandes
        .filter(demande => filtre === 'toutes' || demande.statut === filtre)
        .map(etd => (
            <tr key={etd.idD}>
                <td>{etd.idD}</td>
                <td>{etd.dateDemande}</td>
                <td>{etd.typeDocument}</td>
                <td>{etd.etudiant.username}</td>
                <td>{etd.etudiant.apogee}</td>
                <td>{etd.etudiant.cin}</td>
                <td>{etd.statut}</td>
                <td><FontAwesomeIcon icon={faCheck} style={{ color: "#009500" }} onClick={() => { Accepter(etd.idD) }} /></td>
                <td><FontAwesomeIcon icon={faTimes} style={{ color: "#ff0000" }} onClick={() => { refuser(etd.idD) }} /></td>
                <td><i className='bx bxs-trash' onClick={() => supprimer(etd.idD)}></i></td>
            </tr>
        ));

    return (
        <div className='admin-dashboard-container'>
            <section className='admin-list-data'>
                <div className='admin-list-tab-container'>
                    <div className="admin-info-tab">
                        <h3>List des demandes</h3>
                        <div className='btn-demande-reclamation'>
                            <button className='list-add-element' onClick={() => setFiltre('toutes')}>Toutes</button>
                            <button className='list-add-element' onClick={() => setFiltre('Accepté')}>Acceptées</button>
                            <button className='list-add-element' onClick={() => setFiltre('refusé')}>Refusées</button>
                            <button className='list-add-element' onClick={() => setFiltre('en attente')}>En attente</button>
                        </div>
                    </div>
                    <table className='admin-tab'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date de Demande</th>
                                <th>Type de Document</th>
                                <th>Nom utilisateur</th>
                                <th>Apogee</th>
                                <th>CIN</th>
                                <th>Statut</th>
                                <th>Accepter</th>
                                <th>Refuser</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listDemandes}
                        </tbody>
                    </table>
                </div>
            </section>
            {showDialog && (
                <div className="confirmation-dialog">
                    <div className="dialog-content">
                        <p>Êtes-vous sûr de vouloir supprimer cette demande ?</p>
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
