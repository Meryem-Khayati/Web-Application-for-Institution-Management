import React, { useEffect } from 'react'
import { useState } from 'react';
import { semestreServices } from '../../services/semestreServices';
import CardSemestreEtdM from './CardSemestreEtdM';
import { useParams,useLocation } from 'react-router-dom';

export default function ListSemestresEtdM() {
    const idFilier = useParams().idfilier;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const annee = searchParams.get('annee');
    

    const [semestre, setSemestre] = useState([]); 

    useEffect(() => {
        semestreServices.getAllSemestre(idFilier,annee)
          .then(res => {
            console.log(res.data);
            setSemestre(res.data); 
          })
          .catch(err => console.log(err.data))
      }, []);

  
      const listSemestres = semestre.map(element=>{
        return <CardSemestreEtdM key={element.id} id={element.id} nom={element.nom} />
      })

    return (
      <div className='admin-dashboard-container'>
      <section className='admin-dashboard-cards'>
            <div>
                <div className='container1'>
                <h1>Cliquez sur une carte de semestre pour voir les étudiants inscrits</h1>
                </div>
                <div className="container-admin-dashboard-cards">
                    {listSemestres}
                </div>
            </div>
         </section>
        </div>
      )
    }
    