import React from 'react'
import {useState,useEffect} from 'react'
import './c-style/Niveaux.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { StudAuthContext } from '../Helpers/StudAuthContext'


const Niveaux = () => {
    const [filesList,setFilesList] = useState([]);
    useEffect(() => {
        if (filesList.length !== 0) setDocs(true);
        else setDocs(false);
    }, [filesList])
    const [StudauthState,setStudAuthState] = useState(false);
    const [research,setResearch]=useState(false);
    const [docs,setDocs]=useState(false);
    const [cours,setCours]=useState(false);
    
    
    useEffect(() => {
       
            axios.get('https://madoun-salman.herokuapp.com/auth2',{
            headers : {
                studentToken: localStorage.getItem("studentToken")
            }

        }).then((response) => {
        if(response.data.error) { setStudAuthState(false);}
        else {
            setStudAuthState(true);
            }
        })

        
       
    }, []) 
    
    const VerifyAuth = () => {
        if (type === 1){setCours(true)}else {setCours(false)}
        
        if (StudauthState) getDocuments(1);
        else getDocuments(2);
        setResearch(true);
        
    }
    
    const [niveau, setNiveau] = useState('%'); 
    const typ=["","Cours","Série d'exercice","Devoir","Examen blanc","Examen national"];
    const niv=["","2BAC SM","2BAC PC","2BAC SVT","1BAC SM","1BAC SE","5EME"];
    const lang=["","Français","Arabe"];
    const [type, setType] = useState('%');
    const [langue, setLangue] = useState('%');
    

   
    
    const getDocuments = async (id) => {
        console.log("Studentfiles");
        axios.get("https://madoun-salman.herokuapp.com/Studentfiles",{
            params : {
                type: type,
                visi :id,
                niveau : niveau,
                langue :langue
            }
        }).then((response)=>{
            setFilesList(response.data);
            console.log(response);
            console.log(docs);
        })
          
        }
        
    return (
        <StudAuthContext.Provider value={{StudauthState,setStudAuthState}}>
        <div>
        
        <div>
                <Row className="g-2" style={{padding:"20px 20px 20px 20px"}}>
                <Col md>
                  <FloatingLabel className="label" controlId="floatingSelectGrid" label="Niveau :">
                    <Form.Select  aria-label="Floating label select example" className="selectinput" onChange= {(event)=>{setNiveau(event.target.value)}} >
                    <option value="%">Tout</option>
                    <option value="1">2BAC SM</option>
                    <option value="2">2BAC PC</option>
                    <option value="3">2BAC SVT</option>
                    <option value="4">1BAC SM</option>
                    <option value="5">1BAC SE</option>
                    <option value="6">5EME</option>
                    </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                 <FloatingLabel className="label" controlId="floatingSelectGrid" label="Contexte :">
                    <Form.Select aria-label="Floating label select example" className="selectinput" onChange= {(event)=>{setType(event.target.value)}} > 
                    <option value="%">Tout</option>
                    <option value="1">Cours</option>
                    <option value="2">Séries d'éxercices</option>
                    <option value="3">Devoirs</option>
                    <option value="4">Examens blancs</option>
                    <option value="5">Examens nationaux</option>
                    </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                 <FloatingLabel className="label" controlId="floatingSelectGrid" label="Option :">
                    <Form.Select aria-label="Floating label select example" className="selectinput" onChange= {(event)=>{setLangue(event.target.value)}}>
                    <option value="%">Tout</option>
                    <option value="1">Français</option>
                    <option value="2">Arabe</option>
                    </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col  xs={1}>
                    <Button variant="outline-light" onClick={VerifyAuth} style={{padding: '15px'}}>Rechercher</Button>
                </Col>
                </Row>        
            </div>
            {research ? <div>
                {docs ? (
                    <div className="ChoicesDiv" style={{padding:""}}>
                            <Table striped bordered hover variant="danger"  className="table align-middle">
                            <thead>
                              <tr>
                                  <th>Niveau</th>
                                  <th>Contexte</th>
                                  <th>Nom du fichier</th>
                                  <th>Description</th>
                                  <th>Langue</th>
                                  <th>Document</th>
                                  {!cours ? 
                                    <th>Correction</th> : 
                                    <></>
                                  }
                                  
                              </tr>
                            </thead>
                            <tbody>
                              {
                                
                                    filesList.map((val,key)=>{
                                      
                                      let path = val.correction_path ;
                                      let ps = process.env.PUBLIC_URL + '/files/' + val.fichier_path ;
                                      let cs = process.env.PUBLIC_URL + '/files/' + path ;
                                      return(
                                      <tr key={key}>
                                          <td>{niv[val.fichier_niveau]}</td>
                                          <td>{typ[val.fichier_type]}</td>
                                          <td>{val.fichier_name}</td>
                                          <td style={{textAlign:"left"}}><pre>{val.fichier_desciption}</pre></td>
                                          <td>{lang[val.fichier_langue]}</td>
                                          <td><a href ={ps} target="_blank" rel="noreferrer">Download Pdf</a></td>
                                          {!cours ? (path ? (<td><a href ={cs} target="_blank" rel="noreferrer">Download Pdf</a></td>) :
                                              <td> à venir </td>
                                          ) : <></>}
                                      </tr>
                                      )
                                  }) 
                              }
                            </tbody>
                          </Table>
                          </div>
                ):(
                    <dir className="titre1">Les documents ,pour cette recherche, seront ajoutés le plus tôt possible ! </dir>
                )}
                </div>
                
            :(
            <div className="Message">
                <p className="titre">Bienvenue sur le site du Pr.Madoun . <br /> Lancer une recherche pour accéder aux documents ! </p>
            </div>
            ) }
            

       
            </div>
            </StudAuthContext.Provider>
    )
}


export default Niveaux
