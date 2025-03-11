import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicLayout, AcceuilPage, AcctualitePage, EspaceEtudiant } from './ImportsPartiePublic'
import { CardFilierEtdEmploiEtd, FiliersEtdEmploi, ListSemestresEtdEmploiEtd, CardSemestreEtudiantEtd, CardFileEtd } from '../partiePublic/components/emploi/importsEmploi'
import CardsFiles from './components/acctualites/CardsFiles'
import FiliersDetaill from './components/filieres/FiliersDetaill'
import DetailEst from './components/DetailEst'

export default function PublicRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/' element={<AcceuilPage />} />
          <Route path='/filiers/:id' element={<FiliersDetaill />} />
          <Route path='espaceetudiant' element={<EspaceEtudiant />} />
          <Route path='/filier' element={<FiliersEtdEmploi />} />
          <Route path='filier/:idFilier/semestres' element={<ListSemestresEtdEmploiEtd />} />
          <Route path='filier/:idFilier/semestres/:idsemestre/emplois' element={<CardFileEtd />} />
          {/* """""""""""acctualites""""""""""""""""      " */}

          <Route path='annonces/:id/files' element={<CardsFiles />} />
          <Route path='detail' element={<DetailEst />} />

          {/* <Route path='filier/:idFilier/semestres/:idsemestre/emploi' element={< />} /> */}

        </Route>

      </Routes>
    </div>
  )
}
