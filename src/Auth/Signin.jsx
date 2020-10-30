import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { client as clientAtom } from "../recoilState/atoms";
import { login } from "../recoilState/api";
import { Link } from "react-router-dom";
import "./styles.scss";
const Signin = ({ openModal, history }) => {
  const [creds, setCreds] = useState(null);
  const [client, setClient] = useRecoilState(clientAtom);

  useEffect(() => {
    if (client.login) history.push("/blog");
    console.log(process.env.NODE_ENV);
  }, [client, history]);

  const APIresponse = async () => {
    if (!creds) return;

    try {
      const clientData = await login(creds);
      if (!clientData) return;
      setClient({ login: true, client: { ...clientData } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signin">
      <div className="form">
        <h1>Welcome back</h1>
        <div className="signin_inputs">
          <input
            type="text"
            id="email"
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div className="signin_inputs">
          <input
            type="password"
            id="password"
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            placeholder="Password"
          />
        </div>
        <div className="signin_buttons">
          <button onClick={() => APIresponse()}>Login</button>
        </div>
        <p>
          <Link to="/signup">Forgot password ?</Link>
        </p>
      </div>
      <div className="signup_button">
        <button onClick={openModal}>Create an account</button>
      </div>
    </div>
  );
};
export default Signin;
