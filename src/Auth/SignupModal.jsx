import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { client as clientAtom } from "../recoilState/atoms";
import { signup } from "../recoilState/api";
const Signup = ({ show, handleModal, history }) => {
  const [creds, setCreds] = useState(null);
  const [client, setClient] = useRecoilState(clientAtom);

  useEffect(() => {
    if (client.login) history.push("/blog");
  }, [client, history]);

  const APIresponse = async () => {
    if (!creds) return;
    try {
      const clientData = await signup(creds);
      setClient({ login: true, client: { ...clientData } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <h4>Sign up</h4>
      </Modal.Header>
      <div className="signup">
        <h4>Lets setup an account for you</h4>
        <div className="signup_input">
          <input
            type="text"
            onChange={(e) => setCreds({ ...creds, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div className="signup_input">
          <input
            type="text"
            onChange={(e) => setCreds({ ...creds, surname: e.target.value })}
            placeholder="Your surname"
          />
        </div>
        <div className="signup_input">
          <input
            type="text"
            id="email"
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div className="signup_input">
          <input
            type="password"
            id="password"
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            placeholder="Password"
          />
        </div>
        <p>
          By clicking Sign Up, you agree to our Terms, Data Policy and Cookies
          Policy. You may receive SMS Notifications from us and can opt out any
          time.
        </p>
        <div className="signup_button">
          <button onClick={() => APIresponse()}>Sign up</button>
        </div>
      </div>
    </Modal>
  );
};

export default Signup;
