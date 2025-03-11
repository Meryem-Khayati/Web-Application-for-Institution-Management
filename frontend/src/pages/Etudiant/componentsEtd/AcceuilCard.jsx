import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
export default function AcceuilCard() {
    let navigate = useNavigate();

    function handlClickA() {
        navigate(`/etudiant/profile`);
    }
    function handlClickB() {
        navigate(`/etudiant/demande/add`);
    }
    function handlClickC() {
        navigate(`/etudiant/notes`);
    }
    function handlClickD() {
        navigate(`/etudiant/reclamation/add`);
    }
    return (
        <div>
       
            <section className='admin-dashboard-cards'>
            <div className='header'>
                    <h1>Profil</h1>
                </div>
                <div >
                <div className="container-admin-dashboard-cards">
                        <div className="block-dashboard-admin" onClick={handlClickA}>
                            <div className='card-element'>
                            <FontAwesomeIcon icon={faUser} className='bx bx-news'/>
                                <div className='text'>
                                    <h3>Consulter votre Profil</h3>
                                </div>
                            </div>
                        </div>
                        <div className="block-dashboard-admin" onClick={handlClickB}>
                            <div className='card-element'>
                            <FontAwesomeIcon icon={faEnvelope}  className='bx bx-news' />
                                <div className='text'>
                                    <h3>Demandes</h3>
                                </div>
                            </div>
                        </div>
                        <div className="block-dashboard-admin" onClick={handlClickD}>
                            <div className='card-element'>
                            <FontAwesomeIcon icon={faEnvelope}  className='bx bx-news' />
                                <div className='text'>
                                    <h3>Reclamation</h3>
                                </div>
                            </div>
                        </div>
                        <div className="block-dashboard-admin" onClick={handlClickC}>
                            <div className='card-element'>
                                <i className='bx bx-news'></i>
                                <div className='text'>
                                    <h3>Consulter les Notes</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
