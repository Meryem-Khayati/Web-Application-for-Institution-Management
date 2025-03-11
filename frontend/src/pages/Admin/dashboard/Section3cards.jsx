import React, { useEffect, useState } from 'react'
import admin from './admin.png'
import {etudiantServices} from '../../services/etudiantServices'
import {fileServices} from '../../services/fileServices'
import { moduleServices } from '../../services/moduleServices'
import { annonceServices } from '../../services/annonceServices'
import { demandeServices } from '../../services/demandeServices'

export default function Section3cards() {
    const [etudiant,setEtudiant]=useState("")
    const [filier,setFilier]=useState("")
    const [module,setModule]=useState("")
    const [demande,setDemande]=useState("")
    const [reclamation,setReclamation]=useState("")
    const [annonce,setAnnonce]=useState("")

    useEffect(()=>{
        etudiantServices.getNombre()
        .then(res=>setEtudiant(res.data))
        .catch(err=>console.log(err))
        fileServices.getNombre()
        .then(res=>setFilier(res.data))
        .catch(err=>console.log(err))
        moduleServices.getNombre()
        .then(res=>setModule(res.data))
        .catch(err=>console.log(err))
        annonceServices.getNombre()
        .then(res=>setAnnonce(res.data))
        .catch(err=>console.log(err))
        demandeServices.getNombreD()
        .then(res=>setDemande(res.data))
        .catch(err=>console.log(err))
        demandeServices.getNombreR()
        .then(res=>setReclamation(res.data))
        .catch(err=>console.log(err))
    })
    return (
        <div className='admin-dashboard-container'>
            <section className='admin-dashboard-cards'>
                <div className='header'>
                    <h1>Dashboard</h1>
                </div>
                <div className="container-admin-dashboard-cards">
                    <div className="block-dashboard-admin">
                        <div className='card-element'>
                            <i className='bx bxs-user-pin'></i>
                            <div className='text'>
                                <p>Etudiants</p>
                                <h2>{etudiant}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="block-dashboard-admin">
                        <div className='card-element'>
                            <i className='bx bx-library'></i>
                            <div className='text'>
                                <p>Filiers</p>
                                <h2>{filier}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="block-dashboard-admin">
                        <div className='card-element'>
                            <i className='bx bxs-book-reader'></i>
                            <div className='text'>
                                <p>Modules</p>
                                <h2>{module}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="block-dashboard-admin">
                        <div className='card-element'>
                            <i className='bx bx-news'></i>
                            <div className='text'>
                                <p>Annonces</p>
                                <h2>{annonce}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="block-dashboard-admin">
                        <div className='card-element'>
                            <i className='bx bx-news'></i>
                            <div className='text'>
                                <p>Demandes</p>
                                <h2>{demande}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="block-dashboard-admin">
                        <div className='card-element'>
                            <i className='bx bx-news'></i>
                            <div className='text'>
                                <p>Réclamations</p>
                                <h2>{reclamation}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
