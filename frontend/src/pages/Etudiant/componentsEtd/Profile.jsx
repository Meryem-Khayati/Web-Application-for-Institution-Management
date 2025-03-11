import React, { useEffect, useState } from 'react'
import {etudiantServices} from '../../services/etudiantServices'
import '../css/profile.css'
import { countServices } from '../../services/countServices';
import { faSubway } from '@fortawesome/free-solid-svg-icons';
import logoetd from '../../images/etd.png'

export default function Profile() {
    const [etudiant, setEtudiant] = useState({});
    const [filiere, setFiliere] = useState({});
    const [semestre, setsemestre] = useState({});
    
    
  
    const sub = countServices.getId();
    console.log(sub)
    const idetudiant=sub
   

    useEffect(()=>{
        etudiantServices.getEtudiantData(idetudiant)
        .then(res=>{console.log(res.data);
                    setEtudiant(res.data.etudiant);
                    setFiliere(res.data.filiere);
                    setsemestre(res.data.semestre);
        })
        .catch(err=>{console.log(err.data)})
    },[])
   
   
  return (
    <div className='div-etudiant'>
        <div className='sous-div-profil'>
        <section className='section-etudiant-profil'>
            {/* <img src={logoetd} alt="" className='image-etudiant' /> */}
            <h1 className='name-etudiant'>{etudiant.firstName+ " "+etudiant.lastName}</h1>
        </section>
        <section className='info-etd'>
            <table className='table-info-etd'>
                <th className='th-info-etd'>les information personnele</th>
                <tr className='tr-info-etd'>
                    <td className='td-info-etd'>Nom</td>
                    <td>{etudiant.firstName}</td>
                </tr>
                <tr className='tr-info-etd'>
                    <td className='td-info-etd'>Prénom</td>
                    <td>{etudiant.lastName} </td>
                </tr>
                <tr className='tr-info-etd'>
                    <td className='td-info-etd'>CIN</td>
                    <td>{etudiant.cin} </td>
                </tr>
                <tr className='tr-info-etd'>
                    <td className='td-info-etd'>Date de naissance</td>
                    <td>{etudiant.dateNaissance} </td>
                </tr>

                <th className='th1-info-etd'>les informations profesionel</th>
                <tr className='tr-info-etd'>
                    <td className='td-info-etd'>CNE</td>
                    <td>{etudiant.cne} </td>
                </tr>
                <tr className='tr-info-etd'>
                    <td className='td-info-etd'>Apogee</td>
                    <td>{etudiant.apogee} </td>
                </tr>
                <tr className='tr-info-etd'>
                    <td className='td-info-etd'>Filier</td>
                    <td>{filiere.nom}</td>
                </tr>
                <tr className='tr-info-etd'>
                    <td className='td-info-etd'>semestre</td>
                    <td>{semestre.nom}</td>
                </tr>
            </table>
          
        </section>
        </div>
    </div>
  )
}
