import Axios from "./axiosServices"

function ajouterEtudiant(idfilier, idsemestre, etd) {
   return Axios.post(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/etudiants`, etd);
}

function getAllEtudiants(idfilier, idsemestre) {
   return Axios.get(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/etudiants`);

}



function deleteEtudiant(idfilier, idsemestre, eId) {
   return Axios.delete(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/etudiants/` + eId);
}

function getEtudiant(idfilier, idsemestre, eid) {
   return Axios.get(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/etudiants/` + eid);

}

function updateEtudiant(idfilier, idsemestre, eid, etd) {

   return Axios.patch(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/etudiants/` + eid, etd);
}
// ------------------------- espace etudiant---------------------
function getEtudiantData(idetudiant) {
   return Axios.get(`/${idetudiant}/details`, idetudiant)
}
function getEtudiantById(idetudiant) {
   return Axios.get('/etudiantss/' + idetudiant)
}

function getEtudiantNoteByApogee(apogee) {
   return Axios.get(`/profil/etudiants/${apogee}/infos-avec-notes`)
}
function changerSemestre(id) {
   return Axios.post(`/${id}/changer-semestre`)
}
function getNombre() {
   return Axios.get(`etudiants/nombre`)
}

export const etudiantServices = {

   ajouterEtudiant, getAllEtudiants, deleteEtudiant, getEtudiant, updateEtudiant, getEtudiantData, getEtudiantById, getEtudiantNoteByApogee, changerSemestre, getNombre
}