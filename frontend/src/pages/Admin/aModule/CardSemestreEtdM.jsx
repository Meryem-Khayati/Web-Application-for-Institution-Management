import React, { useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

export default function CardSemestreEtdM(props) {
    let navigate=useNavigate();
    const idFilier = useParams().idfilier;
    console.log(idFilier)
    
    function handlClick(){
        navigate(`/dashboard/filieres/${idFilier}/semestres/${props.id}/modules`);
    }
  return (  
       <div className="block-dashboard-admin">
             <div className='card-element'onClick={handlClick}>
                <i class='bx bx-library'></i>
                <div className='text'>
                  <h1 className='filiereTitree'>{props.nom}</h1>
                </div>
              </div>
              
              
       </div>
  )
}
