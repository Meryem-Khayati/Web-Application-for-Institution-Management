import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {countServices} from '../../services/countServices'
import admin from './admin.png';

export default function Section1sidbar() {
    const [isSectionVisible, setIsSectionVisible] = useState(true);

    const toggleSectionVisibility = () => {
        setIsSectionVisible(!isSectionVisible);
        
    };
    function handelClik(e){
        countServices.logOut();
    }
    return (
        <div className='admin-dashboard-container'>
            <div className={`alldashcontainer ${isSectionVisible?'':'new-alldashcontainer'}`} >
            <section  className={`container-nav-admin-dashboard ${isSectionVisible?'':'new-container-nav-admin-dashboard'}`} >
                <nav className='nav-admin-dashoard'>
                    <div className='burgar-admin-dashboard'  onClick={toggleSectionVisibility}>
                        <i className='bx bx-menu'></i>
                    </div>
                    <div className='nav-connection'>
                        <h3>Espace de l'Administrateur</h3>
                    </div>
                </nav>
            </section>
            <section className={`section-dashoard-admin ${isSectionVisible?'':'new-section-dashoard-admin'}`}>
                <div className="header-dashboard-admin">
                    <Link to='/dashboard'>
                        <i className='bx bxs-dashboard icon-dashboard-admin'></i>
                        <span className='spans-dashboard-admin'>Dashboard</span>
                    </Link>
                </div>
                <ul className='list-dashboard-admin'>
                    <li className='li-dashboard-admin'>
                        <Link to='/'>
                            <i className='bx bxs-home-alt-2 home-dashboard-admin'></i>
                            <span className='spans-dashboard-admin'>Accueil</span>
                        </Link>
                    </li>
                   

                    <li className='li-dashboard-admin'>
                        <Link to='/dashboard/filier'>
                            <i className='bx bx-library'></i>
                            <span className='spans-dashboard-admin'>Filières</span>
                        </Link>
                    </li>

                    <li className='li-dashboard-admin'>
                        <Link to='/dashboard/filiers'>
                            <i className='bx bx-library'></i>
                            <span className='spans-dashboard-admin'>Semestres</span>
                        </Link>
                    </li>
                    <li className='li-dashboard-admin'>
                        <Link to='/dashboard/filierss'>
                            <i className='bx bxs-user-pin'></i>
                            <span className='spans-dashboard-admin'>Étudiants</span>
                        </Link>
                    </li>

                    <li className='li-dashboard-admin'>
                        <Link to='/dashboard/filierr'>
                            <i className='bx bx-time-five'></i>
                            <span className='spans-dashboard-admin'>Emplois du temps</span>
                        </Link>

                    </li>

                    <li className='li-dashboard-admin'>
                        <Link to='/dashboard/filieres'>
                            <i className='bx bxs-book-reader'></i>
                            <span className='spans-dashboard-admin'>Modules</span>
                        </Link>

                    </li>


                    <li className='li-dashboard-admin'>
                        <Link to='/dashboard/demandes'>
                            <i className='bx bx-mail-send'></i>
                            <span className='spans-dashboard-admin'>Demandes de documents</span>
                        </Link>

                    </li>
                    <li className='li-dashboard-admin'>
                        <Link to='/dashboard/reclamations'>
                            <i className='bx bx-mail-send'></i>
                            <span className='spans-dashboard-admin'>Réclamations</span>
                        </Link>

                    </li>
                    <li className='li-dashboard-admin'>
                        <Link to='/dashboard/annonces'>
                            <i className='bx bxs-notification'></i>
                            <span className='spans-dashboard-admin'>Annonces</span>
                        </Link>

                    </li>
                    <li className='li-dashboard-admin logout-dashboard-admin'onClick={handelClik}>
                        <Link to='/auth/login'>
                            <i className='bx bxs-log-out-circle' ></i>
                            <span className='spans-dashboard-admin'>Se déconnecter</span>
                        </Link>

                    </li>
                </ul>
            </section>

            </div>
        </div>
    )
}
