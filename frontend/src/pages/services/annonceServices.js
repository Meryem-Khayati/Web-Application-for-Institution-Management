import Axios from "./axiosServices"

function ajouterAnnonce(annonce) {

    return Axios.post(`/dashboard/annonces`, annonce);
}

function getAllAnnonces() {
    return Axios.get(`/annonces`);
}

function getAnnonce(idannonce) {
    return Axios.get(`/annonces/` + idannonce);
}


function updateAnnonce(idannonce, annonce) {
    return Axios.put(`/dashboard/annonces/` + idannonce, annonce);
}


function deleteAnnonce(idannonce) {
    return Axios.delete(`/dashboard/annonces/` + idannonce);
}
function getNombre() {
    return Axios.get(`annonces/nombre`)
}


export const annonceServices = {

    ajouterAnnonce, getAllAnnonces, deleteAnnonce, getAnnonce, updateAnnonce, getNombre
}