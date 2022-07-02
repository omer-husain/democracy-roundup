import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CampaignList from "./components/CampaignList/CampaignList";
import CampaignPage from "./components/CampaignPage/CampaignPage";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [campaigns, setCampaigns] = useState(null);
  

  const fetchCampaigns = async () => {
    let response = await axios.get("http://localhost:8080/campaigns");
    console.log(response.data);
    setCampaigns(response.data);
  };
 

  useEffect(() => {
    console.log("fetch campaigns was called");
    fetchCampaigns();
  }, []);

  return campaigns ? (
    <>
      <Router>
        <Header />
        <Switch>
          <Container>
            <Route exact path="/">
              <CampaignList campaigns={campaigns} />
            </Route>
            <Route path="/campaigns/:id">
              {" "}
              <CampaignPage />
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
