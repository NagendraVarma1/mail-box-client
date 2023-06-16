import React, { Fragment, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { MailActions } from "../Store/mail-slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SentBox = () => {
    const [sentBox, setSentBox] = useState([]);
    const [reload, setReload] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mail = localStorage.getItem("email");
  const updatedMail = mail.replace("@", "").replace(".", "");

    const fetchSentboxHandler = () => {
        setReload(false);
        fetch(`https://mail-box-client-c7cc0-default-rtdb.firebaseio.com/from${updatedMail}.json`)
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
              const allSentboxMails = Object.keys(data).map((key) => ({
                id: key,
                toMail: data[key].toMail,
                subject: data[key].subject,
                body: data[key].body,
              }));
              setSentBox(allSentboxMails);
            } else {
              setSentBox([]);
            }
          })
          .catch((err) => {
            alert(err.message);
          });
    }

    const openMailHandler = (mail) => {
        dispatch(MailActions.openMail(mail));
        navigate("/openMail");
    }

    const mailDeleteHandler = (id) => {
        fetch(
          `https://mail-box-client-c7cc0-default-rtdb.firebaseio.com/from${updatedMail}/${id}.json`,
          {
            method: "DELETE",
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Deleting mail failed!");
            } else {
              return res.json();
            }
          })
          .then((data) => {
            setReload(true);
            console.log(data);
          })
          .catch((err) => {
            alert(err.message);
          });
      };

    const noMails = sentBox.length === 0;

    useEffect(() => {
        if(reload) {
            fetchSentboxHandler();
        }
    },[reload])
    return (
        <Fragment>
      <Container className="mt-3">
        <div className="text-center mt-2" style={{ fontFamily: "serif" }}>
          <h1>Sentbox</h1>
        </div>
        {noMails && (
          <Container className="mt-5 text-center">
            <h1>No Mails....</h1>
          </Container>
        )}
        <ul className="list-unstyled">
          {sentBox.map((mail) => (
            <li key={mail.id}>
              <Container
                fluid
                className="shadow-lg mt-4"
                style={{ border: "1px solid black", borderRadius: "5px" }}
              >
                <div style={{ display: "flex", height: "70px" }}>
                  <Button
                    variant="ouline-light w-100"
                    onClick={() => {
                      openMailHandler(mail);
                    }}
                  >
                    <p style={{ float: "left" }}>
                      <span style={{ fontWeight: "bold" }}>To: </span>
                      {mail.toMail}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Subject: </span>
                      {mail.subject}
                    </p>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    style={{ height: "40px", marginTop: "15px" }}
                    onClick={() => mailDeleteHandler(mail.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Container>
            </li>
          ))}
        </ul>
      </Container>
    </Fragment>
    )
}

export default SentBox;