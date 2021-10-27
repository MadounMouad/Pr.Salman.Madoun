import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from 'axios'
import app from '../util/firebase'

import { useState } from 'react'

const CorrectionModal = () => {
    const [show, setShow] = useState(false);
    const [selectedFile,setFile] = useState(null);
    const [fichier_id,setFichier_id] = useState(null);
    const [filesList,setFilesList] = useState([]);
   
  //****************************Changes*************************** */
  const addFILEURL = async () => {
    const storageRef = app.storage().ref()
    const fileName = Date.now()+ selectedFile.name ;
    const fileRef = storageRef.child(fileName);
    await fileRef.put(selectedFile);
    await fileRef.getDownloadURL().then((url) => {
      updateElement(url,fileName);

    });
  };
  
  const deletefile = (id) => {
    const storageRef = app.storage().ref().child(id);
    storageRef.delete().then(() => {
      console.log("file deleted")
    });}
  //***************************************************************/

    const refreshPage = ()=>{
      window.location.reload();
   }

    /* const addElemetFile = async () => {
        const data = new FormData() 
           data.append('file',selectedFile)
           const res = await axios.post("http://localhost:4000/upload",data,{}) // then print response status
           console.log(res.data);
             
         }; */
    const updateElement = async (url,cor_name) => {
            let file_name = "";
           // get  path of the correction (if it exists) so we can delete it 
            for(let i=0;i<filesList.length;i++)
            {
              if (filesList[i].fichier_id === fichier_id) {
                file_name = filesList[i].co_name ;
                if(file_name !== "" ) {
                  deletefile(file_name);
                }
                
              }
            }
            const res = await axios.post("https://madoun-salman.herokuapp.com/updatePath",{fichier_id:fichier_id,co_path:url,co_name:cor_name},{}) // then print response status
            console.log(res.data);
            
             };
    
    const getDocumentsNames = () => {
                axios.get("https://madoun-salman.herokuapp.com/fichiers").then((response) => {
                  console.log(response);
                  setFilesList(response.data);
                })
              }
    
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-light" size="lg" onClick={() => {getDocumentsNames();handleShow()}}>
         Ajouter/Modifier une correction
       </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une correction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingSelect" label="Vos documents :" className="mb-3">
          <Form.Select aria-label="Default select example" onChange= {(event)=>{setFichier_id(event.target.value)}}>
            <option >Choisir un élement parmis vos documents</option>
            {
                filesList.map((val,key)=>{
                    return(
                    <option key={key} value={val.fichier_id} >{val.fichier_name}</option>
                    )
                })
            }
        </Form.Select>
        </FloatingLabel>
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={(event) => {setFile(event.target.files[0]);}}/>
        </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="outline-dark" onClick={async () => {await addFILEURL();handleClose();refreshPage();}}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CorrectionModal
