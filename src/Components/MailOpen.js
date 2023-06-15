import React from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MailOpen = () => {
    const navigate = useNavigate();
  const mail = useSelector((state) => state.mail.mail);
  const closeMailHandler = () => {
    navigate('/home')
  }
  
  return (
    <Container
      className="mt-5 shadow-lg"
      style={{ border: "1px solid black", borderRadius: "5px" }}
    >
      <div className="m-3" style={{ float: "right" }}>
        <Button onClick={closeMailHandler}>X</Button>
      </div>
      <div className="m-3">
        <h2>Subject: {mail.subject}</h2>
      </div>
      <div className="m-3">
        <h5>From: {mail.fromMail}</h5>
      </div>
      <div
        className="m-3 p-3"
        style={{
          backgroundColor: "rgb(233, 228, 227)",
          height: "300px",
          borderRadius: "10px",
        }}
      >
        <p className="m-3">{mail.body}</p>
      </div>
    </Container>
  );
};

export default MailOpen;
