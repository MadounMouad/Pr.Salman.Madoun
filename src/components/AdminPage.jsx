import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from 'axios'
import CorrectionModal from './CorrectionModal'
import { useState } from 'react'
import "./c-style/adminPage.css"
import AdminFilesTab from './AdminFilesTab'
import Password from './Password'
import app from '../util/firebase'

const AdminPage = () => {
    //****************** 
    const [selectedFile,setFile] = useState(null);
    const [Error,setError] = useState("");
    


    const addFILEURL = async () => {
      const storageRef = app.storage().ref()
      const fileName = Date.now()+ selectedFile.name ;
      const fileRef = storageRef.child(fileName);
      await fileRef.put(selectedFile);
      await fileRef.getDownloadURL().then((url) => {
        addElement(url,fileName);

      });
    };
    //******************
    
    //states of form's parameters
    
    const [type, setType] = useState(0);
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [visi, setVisi] = useState(0);
    const [langue, setLangue] = useState(0);
    const [niveau, setNiveau] = useState(0);
    

    //--------------------------------
   
    //Mange add element modal
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);}
    const handleShow = () => {setError("");setFile("");setShow(true);}
    //---------------------------------
    
    

    const refreshPage = ()=>{
      window.location.reload();
   }

   const addFile = async () => {
     if (selectedFile){
    handleClose();
    /* await addElemetFile(); */
    await addFILEURL();
    refreshPage();}
    else {
      setError("Vous devez choisir un document !!");
    }
    
    
   }

    //send data in a request------------------------------------------------------------------
    /* const addElemetFile = async () => {
     const data = new FormData() 
        data.append('file',selectedFile)
      
        const res = await axios.post("http://localhost:4000/upload",data,{});
        console.log(res.data);
      }; */
      
    const addElement =async (url,filename) => {
        axios.post("https://madoun-salman.herokuapp.com/create",{
          type : type,
          nom : nom ,
          description : description,
          visi : visi,
          langue :langue,
          niveau: niveau, 
          fileURL :url,
          fileName: filename
        }).then((response) => {
          console.log(response.data);
        })
      };
    //---------------------------------------------------------------------------------------------




  
    return (
        <div>
        <div className="contentDiv">

        <div className="modalDiv">
        <Button variant="outline-light" size="lg" onClick={handleShow}>
         Ajouter un élement
        </Button>
        <CorrectionModal/>
        <Password/>


        </div>

        <div className="ChoicesDiv">
          <AdminFilesTab/>
        </div>
        
        
        <Modal show={show} onHide={handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un élement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
          
          <FloatingLabel controlId="floatingSelect" label="Niveau :" className="mb-3">
          <Form.Select aria-label="Default select example" onChange= {(event)=>{setNiveau(event.target.value)}}>
            <option>Choisir un niveau</option>
            <option value="1">2BAC SM</option>
            <option value="2">2BAC PC</option>
            <option value="3">2BAC SVT</option>
            <option value="4">1BAC SM</option>
            <option value="5">1BAC SE</option>
            <option value="6">5EME</option>
        </Form.Select>
        </FloatingLabel>
          <FloatingLabel controlId="floatingSelect" label="Type du fichier :" className="mb-3">
          <Form.Select aria-label="Default select example" onChange= {(event)=>{setType(event.target.value)}}>
            <option >Choisir un fichier</option>
            <option value="1">Cours</option>
            <option value="2">Série d'exercice</option>
            <option value="3">Devoir</option>
            <option value="4">Examen blanc</option>
            <option value="5">Examen national</option>
        </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingText" label="Nom du fichier :" className="mb-3">
            <Form.Control type="text" placeholder="Normal text" onChange= {(event)=>{setNom(event.target.value)}}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Ajouter une description :" >
            <Form.Control
            onChange= {(event)=>{setDescription(event.target.value)}}
             as="textarea"
             placeholder="Leave a comment here"
             style={{ height: '100px' }}
          /> <br />
         </FloatingLabel>
         <FloatingLabel controlId="floatingSelect" label="Langue :" className="mb-3">
          <Form.Select aria-label="Default select example" onChange= {(event)=>{setLangue(event.target.value)}}>
            <option>Choisir une langue</option>
            <option value="1">Français</option>
            <option value="2">Arabe</option>
        </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Visibilité :" className="mb-3">
          <Form.Select aria-label="Default select example" onChange= {(event)=>{setVisi(event.target.value)}}>
            <option>Choisir une option</option>
            <option value="1">Privé</option>
            <option value="2">Public</option>
            <option value="0">Pour moi uniquement</option>
        </Form.Select>
        </FloatingLabel>
        
        
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={(event) => {setFile(event.target.files[0]);}}/>
        </Form.Group>
        <Form.Text style={{color: "red"}} >
            {Error}
        </Form.Text> 
          
          
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="outline-dark" onClick={addFile}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
        </div>
    );
}

export default AdminPage

