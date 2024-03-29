import React, { Fragment, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

const ComposeMail = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const subjectInputRef = useRef();

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  }

  const sendMailHandler = (event) => {
    event.preventDefault();

    const toMail = emailInputRef.current.value;
    const updatedToMail = toMail.replace("@", "").replace(".", "");
    const fromMail = localStorage.getItem("email");
    const updatedFromMail = fromMail.replace("@", "").replace(".", "");
    const subject = subjectInputRef.current.value;
    const body = editorState.getCurrentContent().getPlainText();
    const unreadMail = true;

    const composedMail = {
      fromMail,
      subject,
      body,
      unreadMail
    };

    const sentBoxMail = {
      toMail,
      subject, 
      body,
    }

    fetch(
      `https://mail-box-client-c7cc0-default-rtdb.firebaseio.com/to${updatedToMail}.json`,
      {
        method: "POST",
        body: JSON.stringify(composedMail),
        headers: {
          "Content-Type": "application.json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error("Email Sent Failed!");
          });
        }
      })
      .then((data) => {
        console.log(data);
      });

      fetch(
        `https://mail-box-client-c7cc0-default-rtdb.firebaseio.com/from${updatedFromMail}.json`,
        {
          method: "POST",
          body: JSON.stringify(sentBoxMail),
          headers: {
            "Content-Type": "application.json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error("Email Sent Failed!");
            });
          }
        })
        .then((data) => {
          console.log(data);
        });

      emailInputRef.current.value = '';
      subjectInputRef.current.value = '';
      setEditorState(EditorState.createEmpty());
  };

  return (
    <Fragment>
      <Container
        className="p-3 shadow-lg"
        style={{ marginTop: "20px", width: "70%", border: "2px solid black" }}
      >
        <div
          className="mb-2"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h5>New Message</h5>
          <Button variant="outline-dark" onClick={() => navigate("/home")}>
            X
          </Button>
        </div>
        <Form onSubmit={sendMailHandler}>
          <Form.Group style={{ display: "flex" }}>
            <Form.Label style={{ marginRight: "10px" }}>To: </Form.Label>
            <Form.Control
              type="email"
              className="mb-3"
              ref={emailInputRef}
              required
            />
          </Form.Group>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Subject"
            ref={subjectInputRef}
          />
          <Editor
            editorState={editorState}
            toolbarClassName="hidden"
            wrapperClassName="border mb-3"
            editorClassName="w-full mb-5"
            onEditorStateChange={onEditorStateChange}
          />
          <Button type="submit">Send Mail</Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default ComposeMail;
