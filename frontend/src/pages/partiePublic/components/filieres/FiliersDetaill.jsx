import React, { useState, useEffect } from 'react';
import { filierServices } from '../../../services/filierServices';
import { useParams } from 'react-router-dom';

export default function FiliersDetaill() {
    const [filiereCards,setFiliereCards]=useState([])
    const id = useParams().id;
    useEffect(()=>{
      filierServices.getFilier(id)
      .then(res=>{
        console.log(res.data);
        setFiliereCards(res.data)
      })
      .catch(err=>{
        console.log(err.data)
      })
    },[id])
  

  return (
    <div className='annonce-data'>
      <div className="annonce-header-data">
        <h1 className="acct">{filiereCards.nom}</h1>
        <div className='div-filiers-detaile'>
           <p className="des-filiere-data">{filiereCards.descreption}</p>
           <img src={`data:image/png;base64,${filiereCards.image}`} alt="" className='image-filier' />
        </div>
      </div>
    </div>
  );
};
