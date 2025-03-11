import React from 'react'
import { Navigate } from 'react-router-dom';
import { countServices } from '../services/countServices';

export default function AuthGarde({children}) {
    if(countServices.isLoged() && countServices.decoderToken().role==="ETUDIANT"){
        return children
    }
    else return <Navigate to='/auth/login' />
    
  
}
