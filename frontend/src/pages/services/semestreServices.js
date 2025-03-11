import Axios from "./axiosServices"

function ajouterSemestre(idFiliere,semestre) {
    return Axios.post(`/dashboard/filieres/${idFiliere}/semestres`,semestre);
}

function getAllSemestre(idFilier,anneeU){
    return Axios.get(`/filieres/${idFilier}/semestres?annee=${anneeU}`);
 }

 function deleteSemestre(idFilier,idSemestre) {
    return Axios.delete(`/dashboard/filieres/${idFilier}/semestres/${idSemestre}`);
}

function getSemestre(idFilier,idSemestre){
    console.log(idSemestre);
    return Axios.get(`/filieres/${idFilier}/semestres/${idSemestre}`);

}
function getSemestresYears(){
    return Axios.get(`/years`);

}
function getAllSemestreDeLastAnnee(id){
    return Axios.get(`/filiere/${id}/lastAcademicYear`);

}

function updateSemestre(idFilier, idSemestre, semestre) {
    console.log("id filier "+idFilier)
    console.log("id semestre "+idSemestre)
    console.log("semestre "+semestre)
  
    return Axios.patch(`/dashboard/filieres/${idFilier}/semestres/${idSemestre}`,semestre);
}

export  const semestreServices={
    getAllSemestreDeLastAnnee,
    ajouterSemestre, getAllSemestre, deleteSemestre, getSemestre, updateSemestre,getSemestresYears
}