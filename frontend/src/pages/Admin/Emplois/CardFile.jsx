import React, { useEffect, useState } from 'react';
import { emploiServices } from '../../services/emploiServices';
import { useNavigate, useParams } from 'react-router-dom';

export default function CardFile() {
    const { idFilier, idsemestre } = useParams();
    const [showPdf, setShowPdf] = useState(false); // State to toggle PDF visibility
    const [fileContent, setFileContent] = useState(null);
    const [emploi, setEmploi] = useState(null);
    const [isEmploiExist, setIsEmploiExist] = useState(false); // State to check if emploi exists
    const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
    const [message, setMessage] = useState(''); // State to store confirmation message
    const navigate = useNavigate();
    const [messageType, setMessageType] = useState(''); // success or error


    useEffect(() => {
        emploiServices.getAllEmploi(idFilier, idsemestre)
            .then(res => {
                if (res.data.length > 0) {
                    const decodedData = res.data[0].file;
                    setFileContent(decodedData);
                    setEmploi(res.data[0]);
                    setIsEmploiExist(true);
                } else {
                    setIsEmploiExist(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [idFilier, idsemestre]);

    function ajouter() {
        navigate(`/dashboard/filierr/${idFilier}/semestres/${idsemestre}/emplois/add`);
    }

    function modifier() {
        if (emploi) {
            navigate(`/dashboard/filierr/${idFilier}/semestres/${idsemestre}/emplois/${emploi.id}`);
        }
    }

    function supprimer() {
        if (emploi) {
            setShowDialog(true); // Show confirmation dialog
            setMessage("Êtes-vous sûr de vouloir supprimer cet emploi du temps ?");
        }
    }

    function confirmDelete() {
        emploiServices.deleteEmploi(idFilier, idsemestre, emploi.id)
            .then(res => {
                console.log("Emploi du temps supprimé avec succès:", res.data);
                setEmploi(null); // Reset emploi state after deletion
                setFileContent(null); // Reset file content after deletion
                setShowDialog(false); // Hide confirmation dialog after deletion
                setMessage('L emploi de temps a été supprimée avec succès.');
                setMessageType('success');
        setTimeout(() => setMessage(''), 13000); // Hide message after 3 seconds
            })
            .catch(err => {
                console.log("Erreur lors de la suppression de l'emploi du temps:", err);
                setMessage('Erreur lors de la suppression de  l emploi du temps.');

                setMessageType('error');
             setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds
            });
    }

    return (
        <div className="">
            <div className='conatainer-btn-nav-emploi'>
                <ul className="list-of-btn-emploi">
                    <li>
                        <button onClick={ajouter} disabled={isEmploiExist}>Ajouter un emploi de temps</button>
                    </li>
                    <li>
                        <button onClick={modifier}  disabled={!isEmploiExist}>Modifier un emploi de temps</button>
                    </li>
                    <li>
                        <button onClick={supprimer}  disabled={!isEmploiExist}>Supprimer l'emploi de temps</button>
                    </li>
                    
                </ul>
            </div>
            {isEmploiExist && (
                <div className='admin-dashboard-emploi-container'>
                    <iframe
                        title="PDF Viewer"
                        src={`data:application/pdf;base64,${fileContent}`}
                        width="100%"
                        height="600"
                        onError={(e) => console.error('Erreur lors du chargement du PDF:', e)}
                    />
                </div>
            )}

            {/* Confirmation dialog */}
            {showDialog && (
                <div className="confirmation-dialog">
                    <div className="dialog-content">
                        <p>{message}</p>
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
