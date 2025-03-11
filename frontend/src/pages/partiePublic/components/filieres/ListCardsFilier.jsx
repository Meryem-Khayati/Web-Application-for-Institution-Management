import React, { useEffect, useState } from 'react'
import CardFiliere from './CardFiliere'

import { filierServices } from '../../../services/filierServices'

export default function ListCardsFilier() {
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
      <CardFiliere key={element.id} id={element.id} nom={element.nom} description={element.descreption} img={element.image} />
    )
  })
  return (
    <>
     <h2 className='titreFilierInfo acct'>les filières</h2>
    <div className='ListCardsFilier'>
      {listFiliereCards}

    </div>
    </>
    
  )
}
