import React from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useState ,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import "./c-style/adminPage.css"
import UpdateFile from './UpdateFile'
import app from '../util/firebase'

const AdminFilesTab = () => {
    useEffect(() => {
        getDocuments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const niv=["","2BAC SM","2BAC PC","2BAC SVT","1BAC SM","1BAC SE","5EME"];
    const typ=["","Cours","Série d'exercice","Devoir","Examen blanc","Examen national"];
    const lang=["","Français","Arabe"];
    const visib=["Pour moi uniquement","Privé","Public"];

    const [type, setType] = useState('%');
    const [visi, setVisi] = useState('%');
    const [langue, setLangue] = useState('%');
    const [niveau, setNiveau] = useState('%');
    const [filesList,setFilesList] = useState([]);
    
    const getDocuments = () => {
        axios.get("https://madoun-salman.herokuapp.com/files",{
            params : {
                type:type,
                visi :visi,
                langue:langue,
                niveau :niveau
            }
        }).then((response) => {
          console.log(response);
          setFilesList(response.data);
        })
      }
      
      //---------delete file from firebase-------
    const deletefile = (id) => {
      const storageRef = app.storage().ref().child(id);
      storageRef.delete().then(() => {
        console.log("file deleted")
      });}
    //---------------------------------
    
      const DeleteElement = (fich_id,fich_name,co_name) => {
        deletefile(fich_name);
        if(co_name !== "" ) deletefile(co_name);
        axios.post("https://madoun-salman.herokuapp.com/DeleteFile",{fich_id:fich_id},{}).then(res => { // then print response status
        console.log(res.data);
           });
         };

    return (
        <div>
            <div>
                <Row className="g-2" >
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
                    <option value="2">Série d'exercice</option>
                    <option value="3">Devoir</option>
                    <option value="4">Examen blanc</option>
                    <option value="5">Examen national</option>
                    </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                 <FloatingLabel className="label" controlId="floatingSelectGrid" label="Langue :">
                    <Form.Select aria-label="Floating label select example" className="selectinput" onChange= {(event)=>{setLangue(event.target.value)}}>
                    <option value="%">Tout</option>
                    <option value="1">Français</option>
                    <option value="2">Arabe</option>
                    </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                 <FloatingLabel className="label" controlId="floatingSelectGrid" label="Confidentialité :">
                    <Form.Select aria-label="Floating label select example" className="selectinput" onChange= {(event)=>{setVisi(event.target.value)}}>
                    <option value="%">Tout</option>
                    <option value="1">Privé</option>
                    <option value="2">Public</option>
                    <option value="0">Pour moi uniquement</option>
                    </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col  xs={1}>
                    <Button variant="outline-light" onClick={getDocuments} style={{padding: '15px'}}>Rechercher</Button>
                </Col>
                </Row>        
            </div>
            <div className="ChoicesDiv">
            <Table striped bordered hover variant="dark" className="table align-middle">
              <thead>
                <tr>
                    <th>Niveau</th>
                    <th>Context</th>
                    <th>Nom du document</th>
                    <th className="description">Description</th>
                    <th>Langue</th>
                    <th>Confidentialité</th>
                    <th>Document</th>
                    <th>Correction</th>
                    <th className="description"></th>
                </tr>
              </thead>
              <tbody>
                {
                  
                      filesList.map((val,key)=>{
                        
                
                        return(
                            <tr>
                            <td>{niv[val.fichier_niveau]}</td>
                            <td>{typ[val.fichier_type]}</td>
                            <td>{val.fichier_name}</td>
                            <td style={{textAlign:"left"}}><pre>{val.fichier_desciption}</pre></td>
                            <td>{lang[val.fichier_langue]}</td>
                            <td>{visib[val.fichier_visibilite]}</td>
                            <td><a href ={val.fichier_path} target="_blank"  rel="noreferrer">Download Pdf</a></td>
                            {val.correction_path ? <td><a href ={val.correction_path} target="_blank"  rel="noreferrer">Download Pdf</a></td> :
                                <td> à venir </td>}
                            <td>
                            <UpdateFile file={val}  />
                            &nbsp;
                            <Button variant="outline-danger" onClick={() => {DeleteElement(val.fichier_id,val.file_name,val.co_name);getDocuments()}} >Supprimer</Button>
                            </td>
                          </tr>
                        )
                    }) 
                }
              </tbody>
            </Table>
            </div>

                    </div>
    )
 }
export default AdminFilesTab
