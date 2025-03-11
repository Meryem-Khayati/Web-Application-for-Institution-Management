import React, { useEffect, useState } from 'react'
import FilierComponent from './FilierComponent';
import { filierServices } from '../../../services/filierServices';

export default function ListFilierComponenets() {
    const [filiereCards,setFiliereCards]=useState([])

    useEffect(()=>{
        filierServices.getAllFilier()
      .then(res=>{
        console.log(res.data);
        setFiliereCards(res.data)
      })
      .catch(err=>{
        console.log(err.data)
      })
    },[])
  
  
  const listFiliereCards = filiereCards.map(element=>{
    return(
      <FilierComponent key={element.id} id={element.id} nom={element.nom} />
    )
  })
    return (
        <div>
            <div className="containerfilier">
                <div className="titre-filier-container">
                    <h1>Diplômes Universitaires de Technologie</h1>
                </div>
                <div className="filier-info-containerrr">
                  {listFiliereCards}
                </div>
            </div>
        </div>
    )
}
