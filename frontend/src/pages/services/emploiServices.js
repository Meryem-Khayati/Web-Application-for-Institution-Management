import Axios from "./axiosServices"

function ajouterEmploi(idfilier,idsemestre,emploi) {
    return Axios.post(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/emplois`,emploi);
}

function getAllEmploi(idfilier,idsemestre){
    return Axios.get(`/filieres/${idfilier}/semestres/${idsemestre}/emplois`);

 }

function getEmploi(idfilier,idsemestre,idemploi){
    console.log(idemploi)
    return Axios.get(`/filieres/${idfilier}/semestres/${idsemestre}/emplois/${idemploi}`);

 }

 function deleteEmploi(idfilier,idsemestre,idemploi) {
    console.log(idfilier+"  "+idsemestre+"  "+idemploi)
    return Axios.delete(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/emplois/${idemploi}`);
}



function updateEmploi(idfilier,idsemestre,idemploi,emploi) {
    return Axios.patch(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/emplois/${idemploi}`,emploi);
}

export  const emploiServices={
    
    ajouterEmploi, getAllEmploi, deleteEmploi, updateEmploi, getEmploi
}