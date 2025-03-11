import Axios from "./axiosServices"

function ajouterFile(idannonce,file) {
    return Axios.post(`/dashboard/annonces/${idannonce}/fichiers`,file);
}

function getAllFiles(idannonce){
    console.log("ddddddddd "+idannonce)
    return Axios.get(`/annonces/${idannonce}/fichiers`);

 }
 function deleteFile(idannonce,idfile) {
    return Axios.delete(`/dashboard/annonces/${idannonce}/fichiers/`+idfile);
}

function getFile(idannonce,idfile){
    return Axios.get(`/annonces/${idannonce}/fichiers/`+idfile);

}

function updateFile(idannonce,idfile,file) {

    return Axios.put(`/dashboard/annonces/${idannonce}/fichiers/`+idfile, file);
}
function getNombre(){
    return Axios.get(`filieres/nombre`)
 }
export  const fileServices={
    
    ajouterFile, getAllFiles, deleteFile, getFile, updateFile,getNombre
}