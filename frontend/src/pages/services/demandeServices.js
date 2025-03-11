import Axios from "./axiosServices"

function ajouterDemande(demande) {
    return Axios.post(`/profil/demandes`,demande);
}
function getAllDemandes() {
    return Axios.get(`/dashboard/demandes`);
}
function getAllDemandesEncour() {
    return Axios.get(`/dashboard/demandes/en-cours`);
}
 function accepterDemande(id,formdata){
    console.log(id)
    console.log(formdata)
    return Axios.post(`/dashboard/demandes/${id}/accepter-et-envoyer-mail`,formdata)
 }
 function refuserDemande(id,formdata){
    return Axios.post(`/dashboard/demandes/${id}/refuser-et-envoyer-mail`,formdata)
 }
 function getNombreD(){
    return Axios.get(`demandes/nombre`)
 }
 function supprimerDemande(id){
    return Axios.delete(`/dashboard/demandes/${id}`)
 }
// """"""""""""""reclamation"""""""""""""""""""""""""
function ajouterReclamation(reclamation){
    console.log(reclamation)
    return Axios.post(`/profil/reclamations`,reclamation);
 }
 function getAllReclamations() {
    return Axios.get(`/dashboard/reclamations`);
}
function AccepterReclamation(id,formdata){
    console.log(id)
    console.log(formdata)
    return Axios.post(`/dashboard/reclamations/${id}/accepter-et-envoyer-mail`,formdata)
 }
 function getNombreR(){
    return Axios.get(`reclamations/nombre`)
 }
 function RefuserReclamation(id,formdata){
    return Axios.post(`/dashboard/reclamations/${id}/refuser-et-envoyer-mail`,formdata)
 }
 function supprimerReclamation(id){
   return Axios.delete(`/dashboard/reclamations/${id}`)
}

export  const demandeServices={

    ajouterDemande,getAllDemandesEncour,accepterDemande,refuserDemande,getAllDemandes,ajouterReclamation,getAllReclamations,AccepterReclamation,getNombreD,getNombreR,RefuserReclamation,
    supprimerDemande,supprimerReclamation,
}