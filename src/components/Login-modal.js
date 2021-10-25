import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState ,useContext} from 'react'
import Form from 'react-bootstrap/Form'
import './c-style/LoginModal.css'
import axios from 'axios'
import { useHistory } from 'react-router'
import { AuthContext } from '../Helpers/AuthContext'
import { StudAuthContext } from '../Helpers/StudAuthContext'

const LoginModel = () => {
  let history = useHistory();
  const {setAuthState} = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [password,setPassword] = useState("");
  const {setStudAuthState}= useContext(StudAuthContext);
  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);setError("")}

  
  const getUsers = () => {
    axios.post("http://localhost:4000/users",{pass : password}).then((response) => {
      if (response.data.error) setError("mot de pass incorrect");
      else {
        handleClose();
        if(response.data.adminToken) {
        localStorage.setItem("adminToken",response.data.adminToken)
        setAuthState(true);
        history.push("/AdminPage");
        }else{
        localStorage.setItem("studentToken",response.data.studentToken)
        setStudAuthState(true);
        history.push("/Niveau");
        }
      }
    })
  }
  

  return (
    <>
      <Button id="danger" variant="danger" onClick={handleShow} >
        SE CONNECTER
      </Button>

      <Modal className="loginModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "#fff"}}>Se Connecter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
    
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label style={{color: "#fff"}}>Mot de passe :</Form.Label>
   
    <Form.Control type="password" placeholder="Mot de passe" onChange={(e)=>{setPassword(e.target.value);setError("")}} />
    <Form.Text style={{color: "red"}} >
    {error}
      </Form.Text> 
  </Form.Group>
      </Form> 
    <Button  className="submit-btn" onClick={getUsers}>
        Se Connecter 
    </Button>
  
        </Modal.Body>
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModel