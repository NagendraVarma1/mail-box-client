import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Navbar,
  NavbarBrand,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const composeClickHandler = () => {
    setShow(false);
    navigate("/composeMail");
  };

  const inboxClickHandler = () => {
    setShow(false);
    navigate("/home");
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login')
  }

  return (
    <Navbar
      style={{
        backgroundColor: "rgb(11, 94, 215)",
        position: "sticky",
        top: "0",
      }}
    >
      <Button variant="outline-light" className="mx-3" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </Button>

      <Offcanvas
        style={{ width: "40%", backgroundColor: "rgb(240,240,240)" }}
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header style={{ border: "1px solid gray" }} closeButton>
          <Offcanvas.Title style={{}}>Mail Box</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row style={{ marginRight: "20px" }}>
            <Col>
              <Container style={{ marginTop: "20px" }}>
                <Row>
                  <Button
                    size="lg"
                    variant="outline-primary"
                    style={{ color: "black", margin: "15px" }}
                    onClick={composeClickHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                      style={{ marginRight: "5px" }}
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                    Compose{" "}
                  </Button>
                </Row>
                <Row>
                  <Button
                    size="lg"
                    variant="outline-primary"
                    style={{ color: "black", margin: "15px" }}
                    onClick={inboxClickHandler}
                  >
                    Inbox
                  </Button>
                </Row>
                <Row>
                  <Button
                    size="lg"
                    variant="outline-primary"
                    style={{ color: "black", margin: "15px" }}
                  >
                    Sent Box
                  </Button>
                </Row>
              </Container>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
        <NavbarBrand className="mx-4" style={{ fontWeight: "bold" }}>
        Mail Box - Client
      </NavbarBrand>
      <Button style={{marginLeft: '30%'}} variant="outline-light" onClick={logoutHandler}>Logout</Button>
      
    </Navbar>
  );
};

export default Header;
