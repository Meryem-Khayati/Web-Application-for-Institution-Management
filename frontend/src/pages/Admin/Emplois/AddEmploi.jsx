
import React, { useState } from 'react';
import { emploiServices } from '../../services/emploiServices';
import { useParams } from 'react-router-dom';

export default function AddEmploi() {
    const idsemestre = useParams().idsemestre;
    const idFilier = useParams().idFilier;
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState('');

    const [isTrue, setIstrue] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        emploiServices.ajouterEmploi(idFilier, idsemestre, formData)
            .then(res => {
                console.log("emploi ajoutée : ", formData);
                console.log(res.data);
                setMessage(res.data.message);
                setIstrue(true);
            })
            .catch(err => {
                console.error(err);
                setMessage("Erreur lors de l'ajout de l'emploi de temps ");
                setIstrue(false)
            });
    }

    return (
        <section id='admin-add-filier-container-etudiant'  className='admin-add-filier-container' >
            <div className='add-content'>
                <div className='title-add-filier'>
                    <h2 className="lora-myuniqueclass">Ajouter Emploi de temps</h2>
                </div>
                {message && <p className={isTrue ? "true" : "false"}>{message}</p>}
                <form onSubmit={handleSubmit} className='form-add-filier'>
                    <label className="label-file-upload">
                        <input id='file-upload' type="file" name='file' onChange={(e) => { setFile(e.target.files[0]) }} placeholder="emploi de temps" required />
                        Choisissez l'emploi de temps
                    </label>
                    <button type="submit" className='btnadd'>Ajouter</button>
                </form>
            </div>
        </section>
    );
};
