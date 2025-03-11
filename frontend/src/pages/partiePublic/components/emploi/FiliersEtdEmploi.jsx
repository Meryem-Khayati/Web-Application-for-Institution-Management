import React, { useEffect } from 'react'
import { useState } from 'react';
import { filierServices } from '../../../services/filierServices';
import CardFilierEtdEmploiEtd from './CardFilierEtdEmploiEtd';
export default function FiliersEtdEmploi() {

  const [filieres, setFilieres] = useState([]);

  useEffect(() => {
    filierServices.getAllFilier()
      .then(res => {
        console.log(res.data);
        setFilieres(res.data);
      })
      .catch(err => console.log(err.data))
  }, []);


  const listFiliers = filieres.map(element => {
    return <CardFilierEtdEmploiEtd key={element.id} id={element.id} nom={element.nom} img={element.image} />
  })

  return (
    <div className='pulic-emploi-container'>
      <section className='public-emploi-cards'>
        <div>
          <div className='header'>
            <h1 className='acct'>Choisissez votre filière</h1>
          </div>
          <div className="container-public-emploi-cards">
            {listFiliers}
          </div>
        </div>
      </section>
    </div>
  )
}
