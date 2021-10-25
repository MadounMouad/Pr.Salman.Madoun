import React from "react"
import "./c-style/Header.css"
import Typed from 'react-typed'
import ContactsBtn from "./contactez-moi"
import ProfilePic from './c-style/pictures/profilePic.jpg'




const Header = () => {
    return ( 
        <div className="header-wrapper">
            <div className="main-info">
                <img src={ProfilePic}  className="salmanpic" />
                <br />
            <Typed className="typed-text" 
                strings={["2éme Bac","1ére Bac","Tronc commun","Sciences Physiques","Sciences Expérimentales","Sciences Mathématiques"]}
                typeSpeed={40}
                backSpeed={60}
                loop
                />
                <h1>“Le succès ne s'imite pas, il se crée.”</h1>
                <Typed className="typed-text" 
                strings={["Cours","Exercices","Problémes","Examens Nationaux et régionaux","Examens blancs"]}
                typeSpeed={40}
                backSpeed={60}
                loop
                />
                <br/>
                <ContactsBtn/>
                
               
            </div>
        </div>
    )
} 

export default Header
