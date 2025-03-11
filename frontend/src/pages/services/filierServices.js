import Axios from "./axiosServices"

function ajouterFilier(filier) {

    return Axios.post('/dashboard/filieres',filier);
}

function getAllFilier(){
    return Axios.get("/filieres");

 }

 function deleteFilier(filierId) {
    return Axios.delete('/dashboard/filieres/'+filierId);
}

function getFilier(filierId){
    console.log(filierId);
    return Axios.get('/filieres/'+filierId);

}

function updateFilier( id,filier) {
  
    return Axios.patch('/dashboard/filieres/'+id, filier);
}

export  const filierServices={
    
    ajouterFilier, getAllFilier, deleteFilier, getFilier, updateFilier
}