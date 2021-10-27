import React, { useState ,useEffect,useContext} from 'react';
import logo from "./c-style/pictures/Salman-logo.png";
import "./c-style/Navbar.css";
import LoginModel from './Login-modal';
import {NavLink} from 'react-router-dom'
import { useHistory } from 'react-router';
import { AuthContext } from '../Helpers/AuthContext'
import { StudAuthContext } from '../Helpers/StudAuthContext'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

const Navbar = ({id}) => {
    let history = useHistory();
    
    const {setAuthState} = useContext(AuthContext);
    const {setStudAuthState}= useContext(StudAuthContext);

    const [coState,setCoState]= useState(false);
    const [adminState,setAdminState]= useState(false);
    
    useEffect(() => {
      switch (id) {
        case 0:{setCoState(false);setAdminState(false);break;}
        case 1:{setCoState(true);setAdminState(true);break;}
        case 2:{setCoState(true);;break;}
        default:
          break;
      }
    }, [id])

    const logout = () => {
      localStorage.removeItem("adminToken");
      setAuthState(false);
      history.push("/");
    }
    const logout2 = () => {
      localStorage.removeItem("studentToken");
      setStudAuthState(false);
      history.push("/");
    }
    
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container">
        
        <a className="navbar-brand" href="/"><img className="logo" src={logo} alt="logo..." /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="None" exact to="/">Acceuil</NavLink>
                </li>
              
            {/*   <li className="nav-item">
               <NavLink className="nav-link" activeClassName="None" to="/AboutMe">Qui Suis-je?</NavLink>
               </li> */}
            {
              coState ? (adminState ? (
              <>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="None" to="/AdminPage">Mes Documents</NavLink>
                </li>
                &nbsp;
                <Button style={{marginLeft:"20px"}} variant="outline-danger" onClick={logout} >Se déconnecter</Button>
                
            </>

              ):(
                <>
               <li className="nav-item">
               <NavLink className="nav-link" activeClassName="None" to="/Niveau">Mes Documents</NavLink>
               </li>
              
               <Button variant="outline-danger"  onClick={logout2} >Se déconnecter</Button>

              </>
             )
              ):(
                <>
                {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  NIVEAUX
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item" activeClassName="None"  to="/Niveau" >2BAC</NavLink></li>
                  <li><NavLink className="dropdown-item" activeClassName="None"  to="/Niveau" >1BAC</NavLink></li>
                  <li><NavLink className="dropdown-item" activeClassName="None"  to="/Niveau" >5EME</NavLink></li>
                  <li><hr  className="dropdown-divider" /></li>
                  <li><Button variant="outline-danger"> QUESTION ?</Button></li>
                </ul>
              </li> */}
                <Dropdown style={{marginLeft:"10px",marginRight:"10px",textAlign:"center"}} >
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark">
                  NIVEAUX
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="/Niveau" style={{textAlign:"center"}}>2BAC</Dropdown.Item>
                    <Dropdown.Item href="/Niveau" style={{textAlign:"center"}}>1BAC</Dropdown.Item>
                    <Dropdown.Item href="/Niveau" style={{textAlign:"center"}}>5EME</Dropdown.Item>
                    <Dropdown.Divider />
                      <Dropdown.Item href="#/" style={{textAlign:"center"}}>QUESTION ?</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                  <li className="nav-item" style={{textAlign:"center"}}>
                  <LoginModel/>
                </li>
                </>
              )
              
            }
             
              
    
            </ul>
            
          </div>
        </div>
        
      </nav>
        
    )
}

export default Navbar;
