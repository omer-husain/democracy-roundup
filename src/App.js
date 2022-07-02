import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import CampaignList from "./components/CampaignList/CampaignList";
import axios from "axios";

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
      <Header />
      <Container>
        <h1>Campaigns</h1>
        <CampaignList campaigns={campaigns} />
      </Container>
    </>
  ) : (
    <>Loading...</>
  );
}

export default App;
