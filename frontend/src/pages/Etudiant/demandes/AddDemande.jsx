import React, { useState } from 'react'
import { demandeServices } from '../../services/demandeServices'
import { countServices } from '../../services/countServices';

export default function AddDemande() {
    const [message, setMessage] = useState('');
    const [isTrue, setIstrue] = useState(false);
    const [demande, setDemande] = useState(
        {

            typeDocument: "",
        })
    const handleInput = (event) => {
        setDemande({
            ...demande,
            [event.target.name]: event.target.value
        })
    }
    const username = countServices.decoderToken().sub
    console.log(username)
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('typeDocument', demande.typeDocument);
        demandeServices.ajouterDemande(formData)
            .then(res => {
                console.log(res.data)
                setMessage(res.data.message);
                setIstrue(true);
            })
            .catch(err => {
                console.log(err.data)
                setMessage("Erreur d'envoi de la demande");
                setIstrue(false)
            })
    }

    return (
        <section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
            <div className='add-content'>
                <div className='title-add-filier'>
                    <h2>Envoyer une demande</h2>
                </div>
                {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

                <form onSubmit={handleSubmit} className='form-add-filier'>
                    <select className='input-add-filier input-add-module' name="typeDocument" value={demande.typeDocument} onChange={handleInput} required>
                        <option>Veuillez choisir le type de demande </option>
                        <option value="ATTESTATION_DE_STAGE">attestation de stage</option>
                        <option value="ATTESTATION_INSCRIPTION">attestation d'inscription</option>
                    </select>
                    <button className='btnadd'>Envoyer</button>
                </form>
            </div>
        </section>



    )
}
