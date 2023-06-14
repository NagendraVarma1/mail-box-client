import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;

        if(enteredPassword === enteredConfirmPassword) {

            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtneV4wzWehCfRw37M-EqyqoUJ8_mY4Jc';

            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then((res) => {
                if(res.ok) {
                    return res.json();
                }
                else {
                    return res.json().then((data) => {
                        throw new Error('Authentication Failed!')
                    })
                }
            }).then((data) => {
                console.log('user signup successfully')
                navigate('/login')
            }).catch((err) => {
                alert(err.message)
            })

        }
        else {
            alert("Password Doesn't Match")
        }

    }

  return (
    <Container className="shadow-lg" style={{border: '1px solid black', borderRadius: '5px', width: '50%', marginTop: '10%'}}>
        <div className="mt-3 text-center">
            <h1>Sign Up</h1>
        </div>
        <Form onSubmit={formSubmitHandler}>
            <Form.Group className="m-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" ref={emailInputRef} required/>
            </Form.Group>
            <Form.Group className="m-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" ref={passwordInputRef} required/>
            </Form.Group>
            <Form.Group className="m-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordInputRef} required/>
            </Form.Group>
            <div className="text-center">
               <Button type="submit">Sign Up</Button> 
            </div>
            <div className="mb-3 text-center">
                <NavLink to={'/login'}>Log in with existing account</NavLink>
            </div>
            
        </Form>
    </Container>
  );
};

export default Signup;
