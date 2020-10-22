import "./scss/main.scss";
import React, { useEffect } from "react";
import Identify from "./pages/Identify";
import Home from "./pages/Home";
import Iot from "./pages/Iot";
import NotFound from "./pages/404route";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import { getUser } from "./recoilState/api";
import { client as clientAtom } from "./recoilState/atoms";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Protected path="/profile" component={Profile} />
          <Protected path="/blog" component={Blog} />
          <Protected path="/iot" component={Iot} />
          <Protected path="/ai" component={Identify} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

function Protected({ component: Component, ...rest }) {
  const [client, setClient] = useRecoilState(clientAtom);
  const clientLog = async () => {
    let data = await getUser();
    console.log(data);
    if (!data) return;

    setClient({ login: true, client: { ...data } });
    return;
  };
  useEffect(() => {
    clientLog();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!client.login) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        } else return <Component {...props} />;
      }}
    />
  );
}

export default App;
