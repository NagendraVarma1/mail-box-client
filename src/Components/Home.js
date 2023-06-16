import React, { Fragment, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { MailActions } from "../Store/mail-slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [inbox, setInbox] = useState([]);
  const [reload, setReload] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mail = localStorage.getItem("email");
  const updatedMail = mail.replace("@", "").replace(".", "");

  const fetchInboxHandler = () => {
    setReload(false);
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
            unreadMail: data[key].unreadMail,
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

    fetch(
      `https://mail-box-client-c7cc0-default-rtdb.firebaseio.com/to${updatedMail}/${mail.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          body: mail.body,
          fromMail: mail.fromMail,
          subject: mail.subject,
          unreadMail: false,
        }),
        headers: {
          "Content-Type": "application.json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Updating unreadMail value failed");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const mailDeleteHandler = (id) => {
    fetch(
      `https://mail-box-client-c7cc0-default-rtdb.firebaseio.com/to${updatedMail}/${id}.json`,
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

  const unReadMails = inbox.filter((mail) => mail.unreadMail === true);
  const count = unReadMails.length;

  const noMails = inbox.length === 0;

  useEffect(() => {
    if (reload) {
      fetchInboxHandler();
    }
  }, [reload]);
  return (
    <Fragment>
      <Container className="mt-3">
        <div className="m-3">
          <h5>UnRead Mails: {count}</h5>
        </div>
        <div className="text-center mt-2" style={{ fontFamily: "serif" }}>
          <h1>Inbox</h1>
        </div>
        {noMails && (
          <Container className="mt-5 text-center">
            <h1>No Mails....</h1>
          </Container>
        )}
        <ul className="list-unstyled">
          {inbox.map((mail) => (
            <li key={mail.id}>
              <Container
                fluid
                className="shadow-lg mt-4"
                style={{ border: "1px solid black", borderRadius: "5px" }}
              >
                <div style={{ display: "flex", height: "70px" }}>
                  {mail.unreadMail && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="rgb(11, 94, 215)"
                      className="bi bi-dot"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    </svg>
                  )}
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
  );
};

export default Home;
