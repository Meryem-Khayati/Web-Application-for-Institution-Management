import React, { useState } from 'react';
import { filierServices } from '../../services/filierServices';
import { useNavigate } from 'react-router-dom';

export default function AddFilier() {
    const [message, setMessage] = useState('');
    const [isTrue, setIstrue] = useState(false);
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate();
    const [filier, setFilier] = useState({
        nom: "",
        description: "",
        image: null
    });

    function resetData() {
        setFilier({
            nom: "",
            description: "",
            image: null
        });
        setFileName('')
    }



    function handleChange(e) {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFilier({
                ...filier,
                image: files[0]
            });
            setFileName(files[0].name);
        } else {
            setFilier({
                ...filier,
                [name]: value
            });
        }
    }

    // function validateForm() {
    //     const { nom, description } = filier;

    //     // Check for whitespace only inputs
    //     if (!nom.trim() || !description.trim()) {
    //         setMessage("Les champs ne doivent pas être vides ou contenir seulement des espaces.");
    //         setIstrue(false);
    //         return false;
    //     }

    //     // Check if nom contains only letters and has a maximum length of 60
    //     const nomRegex = /^[a-zA-ZÀ-ÿ\s]{1,5}$/;
    //     if (!nomRegex.test(nom)) {
    //         setMessage("Le nom de la filière doit contenir uniquement des lettres et un maximum de 60 caractères.");
    //         setIstrue(false);
    //         return false;
    //     }

    //     // Check if description has a maximum of 20 lines
    //     const descriptionLines = description.split('\n').length;
    //     if (descriptionLines > 1) {
    //         setMessage("La description de la filière doit contenir un maximum de 20 lignes.");
    //         setIstrue(false);
    //         return false;
    //     }

    //     return true;
    // }

    function handleSubmit(e) {
        e.preventDefault();

        // if (!validateForm()) {
        //     return;
        // }

        const formData = new FormData();
        formData.append('nom', filier.nom);
        formData.append('descreption', filier.description);
        formData.append('image', filier.image);

        filierServices.ajouterFilier(formData)
            .then(res => {
                console.log("filiere ajoutée : ", formData);
                console.log(res.data);
                setMessage(res.data.message);
                setIstrue(true);
                resetData();
            })
            .catch(err => {
                console.error(err);
                setMessage("Erreur lors de l'ajout de la filière");
                setIstrue(false);
            });
    }

    return (
        <section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
            <div className='add-content'>
                <div className='title-add-filier'>
                    <h2>Ajouter Filière</h2>
                </div>
                {message && <p className={isTrue ? "true" : "false"}>{message}</p>}
                <form onSubmit={handleSubmit} className='form-add-filier'>
                    <input className='input-add-filier' type="text" name='nom' value={filier.nom} onChange={handleChange} placeholder="Nom de la filière" required />
                    <textarea className='input-add-filier' name='description' value={filier.description} onChange={handleChange} placeholder="Description de la filière" required />

                    <label className="label-file-upload">
                        <input id="file-upload" type="file" name="image" onChange={handleChange} accept="image/*" required />
                        {fileName ? <p>Fichier sélectionné: {fileName}</p> : "Choisissez une image pour la Filière"}
                    </label>
                    <button type="submit" className='btnadd'>Ajouter</button>
                </form>
            </div>
        </section>
    );
}
