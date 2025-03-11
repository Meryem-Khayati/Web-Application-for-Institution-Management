import Axios from "./axiosServices"

function ajouterNote(idfilier,idsemestre,idmodule,note) {
    console.log(note);
    return Axios.post(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/${idmodule}/notes`,note);
}

function getAllNotes(idfilier,idsemestre,idmodule){
    return Axios.get(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/${idmodule}/notes`);

 }
function getAllNotesWitheEtd(idfilier,idsemestre,idmodule){
    return Axios.get(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/${idmodule}/etudiants`);
 }

 function getNote(idfilier,idsemestre,idmodule,idnote){
    return Axios.get(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/${idmodule}/notes/`+idnote);

}


function updateNote(idfilier,idsemestre,idmodule,idnote,note) {
    return Axios.patch(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/${idmodule}/notes/`+idnote,note);
}


function deleteNote(idfilier,idsemestre,idmodule,idnote) {
    return Axios.delete(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/${idmodule}/notes/`+idnote);
}


export  const noteServices={
    
    ajouterNote, getAllNotes, deleteNote, getNote, updateNote,getAllNotesWitheEtd
}