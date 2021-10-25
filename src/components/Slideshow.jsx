import pic1 from './c-style/pictures/studentbg.jpeg'
import ProfilePic from './c-style/pictures/profilePic.jpg'
import pic2 from './c-style/pictures/Salman-logo.png'
import React from 'react';
import './c-style/slideshow.css'

import { Fade } from 'react-slideshow-image';

const Slideshow = () => {
  
  return (
    <div>

      <div className="slide-container" >
        <Fade>
          <div className="each-fade">
            <div >
              <img src={ProfilePic} className="picsSize" />
            </div>
            <p style={{background:"red"}}>First Slide</p>
          </div>
          <div className="each-fade">
            <p>Second Slide</p>
            <div>
              <img src={pic1} className="picsSize"/>
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={pic1}  className="picsSize"/>
            </div>
            <p>Third Slide</p>
          </div>
        </Fade>
      </div>
      <div className="slide-container"  >
        <Fade>
          <div className="each-fade">
            <div>
              <img src={ProfilePic} className="picsSize"/>
            </div>
            <p>First Slide</p>
          </div>
          <div className="each-fade">
            <p>Second Slide</p>
            <div>
              <img src={pic1}className="picsSize" />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={pic1} className="picsSize"/>
            </div>
            <p>Third Slide</p>
          </div>
        </Fade>
      </div>
      <div className="slide-container" >
        <Fade>
          <div className="each-fade">
            <div>
              <img src={pic1} className="picsSize"/>
            </div>
            <p>First Slide</p>
          </div>
          <div className="each-fade">
            <p>Second Slide</p>
            <div>
              <img src={pic1} className="picsSize" />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={pic1} className="picsSize" />
            </div>
            <p>Third Slide</p>
          </div>
        </Fade>
      </div>
    
    </div>
  );
};

export default Slideshow;
