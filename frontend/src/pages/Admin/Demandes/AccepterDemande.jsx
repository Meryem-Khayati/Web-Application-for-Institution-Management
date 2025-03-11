import React, { useState } from 'react';
import { demandeServices } from '../../services/demandeServices';
import { useParams } from 'react-router-dom';

export default function AccepterDemande() {
    const [message, setMessage] = useState('');
    const [isTrue, setIsTrue] = useState(false);
    const id = useParams().id;
    const [demandeinfo, setDemandeinfo] = useState({
        body: "",
        subject: ""
    });
    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState('');

    function resetData() {
        setDemandeinfo({
            body: "",
            subject: ""
        });
        setFiles(null);
        setFileName('');
    }

    function handleChange(e) {
        setDemandeinfo({
            ...demandeinfo,
            [e.target.name]: e.target.value
        });
    }

    function handleFileChange(e) {
        setFiles(e.target.files[0]);
        setFileName(e.target.files[0] ? e.target.files[0].name : '');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', files);
        formData.append('body', demandeinfo.body);
        formData.append('subject', demandeinfo.subject);

        demandeServices.accepterDemande(id, formData)
            .then(res => {
                console.log(res.data);
                setMessage(res.data.message);
                setIsTrue(true);
                resetData();
            })
            .catch(err => {
                console.log(err);
                setMessage("Erreur lors de l'acceptation de la demande");
                setIsTrue(false);
            });
    }

    return (
        <section className='admin-add-filier-container'>
            <div className='add-content'>
                <div className='title-add-filier'>
                    <h2 className="lora-myuniqueclass">Ajouter Email</h2>
                </div>
                {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

                <form onSubmit={handleSubmit} className='form-add-filier'>
                    <input
                        className='input-add-filier'
                        type="text"
                        name='body'
                        value={demandeinfo.body}
                        onChange={handleChange}
                        placeholder="entrer le body"
                        required
                    />
                    <input
                        className='input-add-filier'
                        type="text"
                        name='subject'
                        value={demandeinfo.subject}
                        onChange={handleChange}
                        placeholder="subject"
                        required
                    />
                    <label className="label-file-upload">
                        Choisissez le fichier
                        <input
                            id='file-upload'
                            type="file"
                            name='files'
                            onChange={handleFileChange}
                            placeholder="file"
                            required
                        />
                    </label>
                    {fileName && <p>Fichier sélectionné : {fileName}</p>}
                    <button type="submit" className='btnadd'>Envoyer</button>
                </form>
            </div>
        </section>
    );
}
