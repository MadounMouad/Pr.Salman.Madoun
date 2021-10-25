import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from 'axios'
import { useState } from 'react'


const UpdateFile = ({file}) => {
    //states of form's parameters
    const [type, setType] = useState(file.fichier_type);
    const [nom, setNom] = useState(file.fichier_name);
    const [description, setDescription] = useState(file.fichier_desciption);
    const [visi, setVisi] = useState(file.fichier_visibilite);
    const [langue, setLangue] = useState(file.fichier_langue);
    const [niveau, setNiveau] = useState(file.fichier_niveau);
    const [selectedFile,setFile] = useState(null);

    //--------------------------------
   
    //Mange add element modal
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);}
    const handleShow = () => setShow(true);
  
    //-------------------------------
    const refreshPage = ()=>{
        window.location.reload();
     }

    //---------------------------------------
    const updateElemetFile = async () => {
        const data = new FormData() 
           data.append('file',selectedFile)
         
           const resp = await axios.post("http://localhost:4000/upload",data,{})
           console.log(resp.data);
           
         };
    //---------------------------------------
    const updateElement = async (id,path) => {
        const Mydata = {
            id : id ,
            type : type,
            nom : nom ,
            description : description,
            visi : visi,
            langue :langue,
            niveau: niveau,
            path :path
        }
        if (selectedFile){
            console.log("file exists")
            await updateElemetFile();
            axios.post("http://localhost:4000/updateALL",Mydata).then((response) => {
          console.log(response.data);
        })
        }
        else {
            console.log("file dosen't exists")
            axios.post("http://localhost:4000/updateALLButFile",Mydata).then((response) => {
          console.log(response.data);
        })
        }
        
      };

    //-------------------------------------
    return (
        <>

        <Button variant="outline-info" onClick={handleShow} >Modifier</Button>

            <Modal show={show} onHide={handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un élement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
          
          <FloatingLabel controlId="floatingSelect" label="Niveau :" className="mb-3">
          <Form.Select defaultValue={file.fichier_niveau} aria-label="Default select example" onChange= {(event)=>{setNiveau(event.target.value)}}>
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
          <Form.Select defaultValue={file.fichier_type} aria-label="Default select example" onChange= {(event)=>{setType(event.target.value)}}>
            <option >Choisir un fichier</option>
            <option value="1">Cours</option>
            <option value="2">Série d'exercice</option>
            <option value="3">Devoir</option>
            <option value="4">Examen blanc</option>
            <option value="5">Examen national</option>
        </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingText" label="Nom du fichier :" className="mb-3">
            <Form.Control defaultValue={file.fichier_name} type="text" placeholder="Normal text" onChange= {(event)=>{setNom(event.target.value)}}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Ajouter une description :" >
            <Form.Control defaultValue={file.fichier_desciption}
            onChange= {(event)=>{setDescription(event.target.value)}}
             as="textarea"
             placeholder="Leave a comment here"
             style={{ height: '100px' }}
          /> <br />
         </FloatingLabel>
         <FloatingLabel controlId="floatingSelect" label="Langue :" className="mb-3">
          <Form.Select defaultValue={file.fichier_langue} aria-label="Default select example" onChange= {(event)=>{setLangue(event.target.value)}}>
            <option>Choisir une langue</option>
            <option value="1">Français</option>
            <option value="2">Arabe</option>
        </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Visibilité :" className="mb-3">
          <Form.Select defaultValue={file.fichier_visibilite} aria-label="Default select example" onChange= {(event)=>{setVisi(event.target.value)}}>
            <option>Choisir une option</option>
            <option value="1">Privé</option>
            <option value="2">Public</option>
            <option value="0">Pour moi uniquement</option>
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
            <Button variant="outline-dark" onClick={async ()=>{handleClose(); await updateElement(file.fichier_id,file.fichier_path);refreshPage()}}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}

export default UpdateFile
