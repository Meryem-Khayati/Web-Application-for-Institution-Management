import React, { useEffect } from 'react'
import { useState } from 'react';
import { semestreServices } from '../../../services/semestreServices';
import { useParams, useLocation } from 'react-router-dom';
import CardSemestreEtudiantEtd from './CardSemestreEtudiantEtd';

export default function ListSemestresEtdEmploiEtd() {
  const idFilier = useParams().idFilier;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);


  const [semestre, setSemestre] = useState([]);

  useEffect(() => {
    semestreServices.getAllSemestreDeLastAnnee(idFilier)
      .then(res => {
        console.log(res.data);
        setSemestre(res.data);
      })
      .catch(err => console.log(err.data))
  }, []);


  const listSemestres = semestre.map(element => {
    return <CardSemestreEtudiantEtd key={element.id} id={element.id} nom={element.nom} />
  })

  return (
    <div className='pulic-emploi-container'>
      <section className='public-emploi-cards'>
        <div>
          <div className='header'>
            <h1 className='acct'>Choisissez votre semestre</h1>
          </div>
          <div className="container-public-emploi-cards">
            {listSemestres}
          </div>
        </div>
      </section>
    </div>
  )
}

