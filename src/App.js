import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CampaignList from "./components/CampaignList/CampaignList";
import CampaignPage from "./components/CampaignPage/CampaignPage";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateCampaign from "./components/CreateCampaign/CreateCampaign";
import UserLogin from "./components/UserLogin/UserLogin";
import UserSignup from "./components/UserSignup/UserSignup";
import Landing from "./components/Landing/Landing";
import MyRepresentatives from "./components/MyRepresentatives/MyRepresentatives";

function App() {
  const [campaigns, setCampaigns] = useState(null);
  const [loginData, setLoginData] = useState({});

  // .username    .loggedIn
  function isloggedIn(loginData) {
    setLoginData(loginData);
  }

  const fetchCampaigns = async () => {
    let response = await axios.get("http://localhost:8080/campaigns");
    console.log(response.data);
    setCampaigns(response.data);
  };

  useEffect(() => {
    console.log("fetch campaigns was called");
    fetchCampaigns();
  }, []);

  useEffect(() => {}, [loginData]);

  return campaigns ? (
    <>
      <Router>
        <Header login={loginData} />
        <Switch>
          <Container>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/campaigns">
              <CampaignList campaigns={campaigns} />
            </Route>
            <Route exact path="/new">
              <CreateCampaign />
            </Route>
            <Route exact path="/reps">
              <MyRepresentatives />
            </Route>
            <Route exact path="/login">
              <UserLogin isLoggedIn={isloggedIn} />
            </Route>
            <Route exact path="/signup">
              <UserSignup isLoggedIn={isloggedIn} />
            </Route>

            <Route path="/campaigns/:id">
              {" "}
              <CampaignPage user={loginData} campaigns={campaigns} />
            </Route>
          </Container>
        </Switch>
      </Router>
    </>
  ) : (
    <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
}

export default App;
