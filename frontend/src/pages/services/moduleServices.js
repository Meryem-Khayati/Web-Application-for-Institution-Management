import Axios from "./axiosServices"

function ajouterModule(idfilier,idsemestre, module) {
    return Axios.post(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules`,module);
}

function getAllModules(idfilier,idsemestre){
    return Axios.get(`/filieres/${idfilier}/semestres/${idsemestre}/modules`);

 }



 function deleteModule(idfilier,idsemestre, mId) {
    return Axios.delete(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/`+mId);
}

function getModule(idfilier,idsemestre, mid){
    return Axios.get(`/filieres/${idfilier}/semestres/${idsemestre}/modules/`+mid);

}

function updateModule(idfilier,idsemestre,mid,module) {
   
    return Axios.patch(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/`+mid, module);
}
function getNombre(){
    return Axios.get(`modules/nombre`)
 }

export  const moduleServices={
    
    ajouterModule, getAllModules, deleteModule, getModule, updateModule,getNombre
}