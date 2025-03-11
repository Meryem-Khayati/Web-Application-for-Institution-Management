import React, { useEffect } from 'react'
import { useState } from 'react';
import { filierServices } from '../../services/filierServices';
import CardFilierSemestre from './CardFilierSemestre'
export default function FiliersEtudiats() {

    const [filieres, setFilieres] = useState([]); 

    useEffect(() => {
        filierServices.getAllFilier()
          .then(res => {
            console.log(res.data);
            setFilieres(res.data); 
          })
          .catch(err => console.log(err.data))
      }, []);

      const listFiliers = filieres.map(element=>{
        return <CardFilierSemestre key={element.id} id={element.id} nom={element.nom} />
      })

    return (
      <div className='admin-dashboard-container'>
             <section className='admin-dashboard-cards'>
            <div>
                <div className='container1'>
                <h1>Choisissez l'année pour voir les semestres disponibles pour chaque filière</h1>
                </div>
                <div className="container-admin-dashboard-cards">
                    {listFiliers}
                </div>
            </div>
         </section>
        </div>
      )
    }
    