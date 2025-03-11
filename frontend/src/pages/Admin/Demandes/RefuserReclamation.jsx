import React, { useState } from 'react'
import { demandeServices } from '../../services/demandeServices';
import { useParams } from 'react-router-dom';

export default function RefuserReclamation() {
    const [message, setMessage] = useState('');
    const [isTrue, setIstrue] = useState(false);
    const id = useParams().id;
    const [demandeinfo, setDemandeinfo] = useState({
        body: "",
        subject: ""
    });
    function resetData(){
        setDemandeinfo({
           
            body: "",
            subject: ""
        })
    
      }

    function handleChange(e) {
        setDemandeinfo(
            {
                ...demandeinfo,
                [e.target.name]: e.target.value
            }
        )
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('body', demandeinfo.body);
        formData.append('subject', demandeinfo.subject);

        demandeServices.RefuserReclamation(id, formData)
            .then(res => {
                console.log(res.data)
                setMessage(res.data.message);
                setIstrue(true)
                resetData();


            })
            .catch(err => {
                console.log(err)
                setMessage("Erreur lors de la refusion de la réclamation");
                setIstrue(false)

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
                    <input className='input-add-filier' type="text" name='body' value={demandeinfo.body} onChange={handleChange} placeholder="entrer le body" required />
                    <input className='input-add-filier' type="text" name='subject' value={demandeinfo.subject} onChange={handleChange} placeholder="subject" required />
                    <button type="submit" className='btnadd'>Envoyer</button>
                </form>
            </div>
        </section>


    );
};
