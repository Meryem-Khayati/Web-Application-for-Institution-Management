import React from 'react'
import { Routes,Route } from 'react-router-dom'
import {Dashboard,Erreur,AdminLayout} from './ImportsAdmin'
import { AddEtudiant,ListEtudiants,UpdateEtudiant,FiliersEtudiats} from './Etudiant/ImportsEtudiants';
import { AddFilier,ListFiliers,UpdateFilier} from './aFiliere/ImportsFiliers';
import {AddSemestre,ListesSemestre,UpdateSemestre,FiliersSemestre} from './Semestre/ImportsSemester'
import ListSemestresEtudiant from './Etudiant/ListSemestresEtudiant';
import {FiliersEtdEmploi,ListSemestresEtdEmploi,CardFile,AddEmploi,UpdateEmploi} from './Emplois/ImportsEmplois'
import {ListSemestresEtdM,FiliersEtdM,ListModules,AddModule,UpdateModule} from './aModule/ImportsModules'
import {ListNotesM,AddNote,UpdateNote} from './notes/ImportsNotes'
import {AddAnnonce,ListAnnonce,UpdateAnnonce} from './annonces/ImportsAnnonces'
import {ListFile,AddFile,UpdateFile,ShowFile} from './aFichiers/ImportsFichiers'
import {ListDemande,AccepterDemande,ListReclamation,AccepterReclamation} from './Demandes/ImportsDemandes'
import Dashboardadmin from './dashboard/Dashboardadmin';
import RefuserDemande from './Demandes/RefuserDemande';
import RefuserReclamation from './Demandes/RefuserReclamation';





export default function AdminRoutes() {
  return (
    <div>
        <Routes>
          <Route element={<AdminLayout/>}>

             <Route path='/' element={<Dashboardadmin />}/>
             {/* ----------------------les etudiants----------------------- */}
             
                <Route path='filierss' element={<FiliersEtudiats />}/>
                <Route path='filiers/:idFilier' element={<ListSemestresEtudiant />}/>
                <Route path='/filiers/:idfilier/semestres/:idsemestre' element={<ListEtudiants />} />
                <Route path='/filiers/:idfilier/semestres/:idsemestre/etudiant' element={<AddEtudiant />} />
                <Route path='' element={<FiliersEtudiats />} />
                <Route path='/filiers/:idfilier/semestres/:idsemestre/etudiant/:id' element={<UpdateEtudiant/>} />
            

             <Route path='filier' >
                <Route index element={<ListFiliers />}/>
                <Route path='listetudiants/:filierid' element={<ListFiliers />} />
                <Route path='addfilier' element={<AddFilier />} />
                <Route path='updatefilier/:uid' element={<UpdateFilier/>} />
             </Route>

            
                <Route path='filiers' element={<FiliersSemestre/>}/>
                <Route path='filiers/:id/semestres' element={<ListesSemestre />} />
                <Route path='addsemestre/filiers/:id' element={<AddSemestre />} />
                <Route path='filiers/:id/semestres/updatesemestre/:uid' element={<UpdateSemestre/>} />
            
{/* 
             <Route path='module' >
                <Route index element={<ListModules />}/>
                <Route path='addmodule' element={<AddModule />} />
                <Route path='updatemodule/:uid' element={<UpdateModule/>} />
             </Route> */}

            {/*  -------------------- les emplois de temps------------*/}
                
             <Route path='filierr' element={<FiliersEtdEmploi />}/>
             <Route path='filierr/:idFilier/semestres' element={<ListSemestresEtdEmploi />}/>
             <Route path='filierr/:idFilier/semestres/:idsemestre/emplois' element={<CardFile />}/>
             <Route path='filierr/:idFilier/semestres/:idsemestre/emplois/add' element={<AddEmploi />}/>
             <Route path='filierr/:idFilier/semestres/:idsemestre/emplois/:id' element={<UpdateEmploi />}/>

{/* --------------les modules--------------------------- */}
             <Route path='filieres' element={<FiliersEtdM />}/>
             <Route path='filieres/:idfilier/semestres' element={<ListSemestresEtdM />}/>
             <Route path='filieres/:idfilier/semestres/:idsemestre/modules' element={<ListModules />}/>
             <Route path='filieres/:idfilier/semestres/:idsemestre/modules/add' element={<AddModule />}/>
             <Route path='filieres/:idfilier/semestres/:idsemestre/modules/:idmodule' element={<UpdateModule />}/>
             
 {/* --------------------les notes ------------------------ */}

              <Route path='filieress/:idfilier/semestres/:idsemestre/modules/:idmodule/notes' element={<ListNotesM />}/>
              <Route path='filieress/:idfilier/semestres/:idsemestre/modules/:idmodule/etudiant/:apogee/notes/:idnote' element={<UpdateNote />}/>
{/* ---------------annonces -------------------------- */}
              <Route path='/annonces/add' element={<AddAnnonce />}/>
              <Route path='/annonces' element={<ListAnnonce />}/>
              <Route path='/annonces/:idannonce' element={<UpdateAnnonce />}/>
{/* ------------------- les fichiers ------------------------------ */}
              <Route path='/annonces/:idannonce/fichiers' element={<ListFile />}/>
              <Route path='/annonces/:idannonce/fichiers/add' element={<AddFile />}/>
              <Route path='/annonces/:idannonce/fichiers/:idfile' element={<UpdateFile />}/>
              <Route path='/annonces/:idannonce/fichiers/:idfile/show' element={<ShowFile />}/>

              {/* """""""""""""""demandes""""""""""""""""""""" */}
              <Route path='/demandes' element={<ListDemande />}/>
              <Route path='/demandes/:id' element={<AccepterDemande />}/>
              <Route path='/demandes/:id/refuser' element={<RefuserDemande />}/>
              {/* """""""""""""Reclamation """"""""""" */}
              <Route path='/reclamations' element={<ListReclamation />}/>
              <Route path='/reclamations/:id' element={<AccepterReclamation />}/>
              <Route path='/reclamations/:id/refuser' element={<RefuserReclamation />}/>

           </Route>
           <Route path='/*' element={<Erreur/>}/>

        </Routes>  
    </div>
  )
}
