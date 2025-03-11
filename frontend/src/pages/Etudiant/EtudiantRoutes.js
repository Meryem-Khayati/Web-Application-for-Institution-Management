import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Profile from './componentsEtd/Profile'
import EtudiantLayout from './EtudiantLayout'
import DashboardEtd from './dashboardEtd/DashboardEtd'
import AcceuilCard from './componentsEtd/AcceuilCard'
import ListNotes from './notes/ListNotes'
import AddDemande from './demandes/AddDemande'
import AddReclamationD from './demandes/AddReclamationD'

export default function EtudiantRoutes() {
    return (
        <div>
            <Routes>
            <Route element={<EtudiantLayout/>} >
              
            <Route path='/' element={<AcceuilCard />} />
            <Route path='/dashboard' element={<AcceuilCard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/notes' element={<ListNotes />} />
            <Route path='/demande/add' element={<AddDemande />} />
            <Route path='/reclamation/add' element={<AddReclamationD />} />
           
            </Route>
            </Routes>  
        </div>
      )
    }
    