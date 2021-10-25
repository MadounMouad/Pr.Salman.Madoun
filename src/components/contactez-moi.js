import React from 'react'
import { Modal,Button } from 'react-bootstrap'
import './c-style/contactez-moi.css'
import { useState } from 'react';
import { SocialIcon } from 'react-social-icons';




const ContactsBtn = () => {
    const [smShow, setSmShow] = useState(false);
    return (
        <>
        <Button id="danger" variant="danger" style={{textTransform:"uppercase"},{borderColor:"orangered"}} onClick={() => setSmShow(true)}>Contactez-moi</Button>
        <Modal
        className="contactmodal"
          centered
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title className="contactsTitle" id="example-modal-sizes-title-sm">
              Contacts
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="contactsmodal">
            <SocialIcon className="icons" target="_blank" rel="noreferrer" url="mailto:prof.salman.madoun@gmail.com" network="email" />
            <SocialIcon className="icons" target="_blank" rel="noreferrer" network="whatsapp" url="https://wa.me/212643015298"  />
            <SocialIcon className="icons" target="_blank" rel="noreferrer" url="tel:+212643015298"  />
            <SocialIcon className="icons" target="_blank" rel="noreferrer" network="facebook" url="https://www.facebook.com/matadour.salman" />
            <SocialIcon className="icons" target="_blank" rel="noreferrer" network="instagram" url="https://www.instagram.com/salman_madoun" />
            <SocialIcon className="icons" target="_blank" rel="noreferrer"re network="telegram" url="https://telegram.me/profmadoun" />
          </Modal.Body>
        </Modal>
        </>
    )
}

export default ContactsBtn