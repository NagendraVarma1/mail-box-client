import React, { Fragment, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const ComposeMail = () => {
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const subjectInputRef = useRef();
    const textareaInputRef = useRef();

    

    const sendMailHandler = (event) => {
        event.preventDefault();

        const toMail = emailInputRef.current.value;
        const updatedToMail = toMail.replace('@', '').replace('.','')
        const fromMail = localStorage.getItem('email');
        const subject = subjectInputRef.current.value;
        const body = textareaInputRef.current.value;

        const composedMail = {
            fromMail,
            subject,
            body
        }

        fetch(`https://mail-box-client-c7cc0-default-rtdb.firebaseio.com/${updatedToMail}.json`,
        {
            method: 'POST',
            body: JSON.stringify(composedMail),
            headers: {
                'Content-Type' : 'application.json'
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json(); 
            }else {
                return res.json().then((data) => {
                    throw new Error('Email Sent Failed!')
                })
            }
        }).then((data) => {
            console.log(data);
        })
    }

    return (
        
        <Fragment>
            
          <Container className="p-3 shadow-lg" style={{ marginTop: "20px",width: '50%', border: '2px solid black' }}>
            <div
              className="mb-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h5>New Message</h5>
              <Button variant="outline-dark" onClick={() => navigate('/home')}>X</Button>
            </div>
            <Form onSubmit={sendMailHandler}>
              <Form.Group style={{ display: "flex" }}>
                <Form.Label style={{ marginRight: "10px" }}>To: </Form.Label>
                <Form.Control type="email" className="mb-3" ref={emailInputRef} required/>
              </Form.Group>
              <Form.Control className="mb-3" type="text" placeholder="Subject" ref={subjectInputRef}/>
              <Form.Control className="mb-3" as="textarea" rows={10} ref={textareaInputRef}/>
              <Button type="submit">Send Mail</Button>
            </Form>
          </Container>
        </Fragment> 
      );
}

export default ComposeMail;