import React from 'react'

import '../../csspartiepublic/styleFilierCard.css'
import { useNavigate } from 'react-router-dom'


export default function CardFiliere(props) {
  const navigate = useNavigate();
  function voirDetail(){
    navigate('/filiers/'+props.id)
  }
  console.log(props)
  return (
    <div onClick={voirDetail}>
        <div className='containerFC'>
        <div className="contentFC">
             <h4 className='titreFC'>{props.nom}</h4>
            </div>
            <img src={props.img?`data:image/png;base64,${props.img}`:"null"} alt="" className='imgFC' />
        </div>
    </div>
  )
}
