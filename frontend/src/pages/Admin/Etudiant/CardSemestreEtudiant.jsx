import React, { useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

export default function CardSemestreEtudiant(props) {
    let navigate=useNavigate();
    const idFilier = useParams().idFilier;
    function handlClick(){
        navigate(`/dashboard/filiers/${idFilier}/semestres/${props.id}`);
    }
  return (  
    <div className="block-dashboard-admin">
             <div className='card-element'onClick={handlClick}>
                <i className='bx bx-library'></i>
                <div className='text'>
                  <h1 className='filiereTitree'>{props.nom}</h1>
                </div>
              </div>
       </div>
  )
}
