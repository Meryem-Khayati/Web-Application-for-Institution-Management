import React, { useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

export default function CardSemestreEtudiantEtd(props) {
    let navigate=useNavigate();
    const idFilier = useParams().idFilier;
    function handlClick(){
        navigate(`/filier/${idFilier}/semestres/${props.id}/emplois`);
    }
    return (  
      <div className="block-public-emploi">
               <div className='card-element'onClick={handlClick}>
                  <i className='bx bx-library'></i>
                  <div className='text'>
                    <h1 className='filiereTitree'>{props.nom}</h1>
                  </div>
                </div>
         </div>
    )
  }
  