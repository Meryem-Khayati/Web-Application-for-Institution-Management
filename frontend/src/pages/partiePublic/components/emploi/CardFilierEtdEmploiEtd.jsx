import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom'

export default function CardFilierEtdEmploiEtd(props) {
  const[annee,setAnnee]=useState("");
  let navigate=useNavigate();
  function handlClick(){
      navigate(`/filier/${props.id}/semestres`);
  }
  return (
  <div className="block-public-emploi">
    <div className='card-element' onClick={handlClick}>
            <h2 className='filiere-nom'>{props.nom}</h2>
    </div>
</div>

  )
}
