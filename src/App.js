import "./App.scss";
import { useState } from "react";
import Header from "./components/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import CampaignList from "./components/CampaignList/CampaignList";

function App() {

  [campaigns, setCampaigns] = useState(null);


  

  return (
    <>
      <Header />
      <Container>
        <h1>App.js</h1>
        <CampaignList />
      </Container>
    </>
  );
}

export default App;
