import React,{useEffect, useState} from 'react'
import { etudiantServices } from '../../services/etudiantServices';
import  vv from '../../images/vv.svg'

export default function Bienvenu() {
    const [etudiant, setEtudiant] = useState({});
   
    
    const idetudiant=1;
// comme ca on va recupere id d' etudiant 
    // countServices.decoderToken()
    // const sub = countServices.getId();
    // console.log(sub)

    useEffect(()=>{
      etudiantServices.getEtudiantData(idetudiant)
      .then(res=>{console.log(res.data)
        setEtudiant(res.data.etudiant)
      })
      .catch(err=>{console.log(err.data)})
    },[])
  return (
    <div>
      <div className='acceuil-etd-header' >
        <h2>Bienvenue dans votre espace étudiant! </h2>
        {/* <h1>{etudiant.firstName +" "+ etudiant.lastName}</h1> */}
        <h1 className='acceuil-etd-title'>Halima Er -reguigue </h1>
      </div>
       
        <img src={vv} alt="" className='back-acceuil-etd'/>
    </div>
  )
}
