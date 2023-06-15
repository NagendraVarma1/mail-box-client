import React, { Fragment, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { MailActions } from "../Store/mail-slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [inbox, setInbox] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mail = localStorage.getItem("email");
  const updatedMail = mail.replace("@", "").replace(".", "");

  const fetchInboxHandler = () => {
    fetch(
      `https://mail-box-client-c7cc0-default-rtdb.firebaseio.com/to${updatedMail}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error("Fetching Inbox Falied!");
          });
        }
      })
      .then((data) => {
        if (data) {
          const allInboxMails = Object.keys(data).map((key) => ({
            id: key,
            fromMail: data[key].fromMail,
            subject: data[key].subject,
            body: data[key].body,
          }));
          setInbox(allInboxMails);
        } else {
          setInbox([]);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const openMailHandler = (mail) => {
    dispatch(MailActions.openMail(mail));
    navigate("/openMail");
  };

  useEffect(() => {
    fetchInboxHandler();
  }, []);
  return (
    <Fragment>
      <Container>
        <div className="text-center mt-2" style={{ fontFamily: "serif" }}>
          <h1>Inbox</h1>
        </div>
        <ul className="list-unstyled">
          {inbox.map((mail) => (
            <li key={mail.id}>
              <Container
                fluid
                className="shadow-lg mt-4"
                style={{ border: "1px solid black", borderRadius: "5px" }}
              >
                <Button
                  variant="ouline-light w-100"
                  onClick={() => {
                    openMailHandler(mail);
                  }}
                >
                  <p style={{ float: "left" }}>
                    <span style={{ fontWeight: "bold" }}>From: </span>
                    {mail.fromMail}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Subject: </span>
                    {mail.subject}
                  </p>
                </Button>
              </Container>
            </li>
          ))}
        </ul>
      </Container>
    </Fragment>
  );
};

export default Home;
