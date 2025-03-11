import React, { useState } from 'react'
import { demandeServices } from '../../services/demandeServices'
import { countServices } from '../../services/countServices'

export default function AddReclamationD() {
    const username = countServices.decoderToken().sub
    const [message, setMessage] = useState('');
    const [isTrue, setIstrue] = useState(false);

    const [reclamation, setReclamation] = useState(
        {
            typeDocument: "",
            message: ""

        })

    const handleInput = (event) => {
        setReclamation({
            ...reclamation,
            [event.target.name]: event.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('typeDocument', reclamation.typeDocument);
        formData.append('message', reclamation.message);

        demandeServices.ajouterReclamation(formData)
        .then(res => {
            console.log(res.data)
            setMessage(res.data.message);
            setIstrue(true);
        })
        .catch(err => {
            console.log(err.data)
            setMessage("Erreur d'envoi de la réclamation");
            setIstrue(false)
        })
    }

    return (
        <section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
            <div className='add-content'>
                <div className='title-add-filier'>
                    <h2>Envoyer une Réclamation</h2>
                </div>
                {message && <p className={isTrue ? "true" : "false"}>{message}</p>}
                <form onSubmit={handleSubmit} className='form-add-filier'>
                    <select className='input-add-filier input-add-module' name="typeDocument" value={reclamation.typeDocument} onChange={handleInput} required>
                        <option>Veuillez choisir le type de demande  </option>
                        <option value="ATTESTATION_DE_STAGE">attestation de stage</option>
                        <option value="ATTESTATION_INSCRIPTION">attestation d'inscription</option>
                    </select>
                    <textarea className='input-add-filier input-add-module' type='text' name='message' value={reclamation.message} onChange={handleInput} placeholder='  votre message' ></textarea>
                    <button className='btnadd'>Envoyer</button>
                </form>
            </div>
        </section>



    )
}
