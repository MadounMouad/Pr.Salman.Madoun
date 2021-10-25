import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Particles from 'react-particles-js';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import AdminPage from './components/AdminPage';
import { AuthContext } from './Helpers/AuthContext';
import { StudAuthContext } from './Helpers/StudAuthContext';
import {useState,useEffect} from 'react'
/* import Contacts from './components/Contacts' */
import axios from 'axios';
import Niveaux from './components/Niveaux';


function App() {
    const [authState,setAuthState] = useState(false);
    const [StudauthState,setStudAuthState] = useState(false);
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
    
    useEffect(() => {
        
            axios.get('https://madoun-salman.herokuapp.com/auth',{
            headers : {
                adminToken: localStorage.getItem("adminToken")
            }

        }).then((response) => {
            if(response.data.error) {setAuthState(false)}
            else {
                setAuthState(true);
            }
        }) 
     
    }, [])

    return ( 
       
        <AuthContext.Provider value={{authState,setAuthState}}>
        <StudAuthContext.Provider value={{StudauthState,setStudAuthState}}>
        <BrowserRouter>
        
        {authState ? (<div><Navbar id={1} /></div> )
           : 
           (
            StudauthState ? 
            (<div><Navbar id={2} /></div>):
            <Navbar id={0}/>
           )
        }
        
       
            
        
        <Switch>
            <Route exact path="/">
                <Particles  params={{
                particles :{
                    number: {
                        value:70,
                        density:{
                            enable:true,
                            value_area:1000
                        }
                    }
                }
                }}/>
                <Header/>
            </Route>
            
            
            <Route path="/Niveau">
                <Niveaux/>
            </Route>
           
            
           {/*  
            <Route path="/AboutMe">
               <Contacts/>
            </Route> */}
            
            <Route path="/AdminPage">
            {authState ? 
               (<AdminPage/>)
             : <div style={{color:"red"}}> Erreur : Vous devez se connecter d'abord !!  </div>
           
            }
            </Route>
            
            
       
        </Switch>
        
        

       </BrowserRouter>
       </StudAuthContext.Provider>
       </AuthContext.Provider>
    
    );
}

export default App;
