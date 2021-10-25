import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from 'axios'

import { useState } from 'react'

const Password = () => {
    const [show, setShow] = useState(false);
    const [user_id,setUser_id] = useState(0);
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [c_password,setC_Password] = useState("");
    
    const updatePassword = async () => {
            const res = await axios.post("https://madoun-salman.herokuapp.com/updatePass",{user_id :user_id,pass:password,c_pass:c_password},{}) // then print response status
            if(res.data.error) setError(res.data.error) ;
            else {
                setError("");
                handleClose();
                setPassword("");
                setUser_id(0);
                setC_Password("");
                
            }
             };
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-light" size="lg" onClick={() => {setError("");handleShow()}}>
        Modifier les mots de passe
       </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les mots de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingSelect" label="Quel mot de passe vous voulez modifier ?" className="mb-3">
          <Form.Select aria-label="Default select example" onChange= {(event)=>{setUser_id(event.target.value)}}>
            <option value="0" >Quel mot de passe vous voulez modifier ?</option>
            <option value="1">MDP ADMIN</option>
            <option value="2">MDP ÉLEVE</option>
        </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingText" label="Nouveau mot de passe :" className="mb-3">
            <Form.Control type="password" placeholder="Normal text" onChange= {(event)=>{setPassword(event.target.value)}}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingText" label="Confirmer le mot de passe :" className="mb-3">
            <Form.Control type="password" placeholder="Normal text" onChange= {(event)=>{setC_Password(event.target.value)}}/>

        </FloatingLabel>
        <Form.Text style={{color: "red"}} >
            {error}
        </Form.Text> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="outline-dark" onClick={async () => {await updatePassword();}}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Password
