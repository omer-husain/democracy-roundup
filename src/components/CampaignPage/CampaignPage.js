import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import "./CampaignPage.scss";

const CampaignPage = ({ user }) => {
  let params = useParams();
  const [campaign, setCampaign] = useState(null);
  const [lattitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [reps, setReps] = useState(null);

  const fetchSelectedCampaign = async () => {
    let response = await axios.get(
      `http://localhost:8080/campaigns/${params.id}`
    );
    console.log(response.data);
    console.log(params.id);
    setCampaign(response.data);
  };

  async function getLocation() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLattitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  const fetchRepData = async () => {
    let response = await axios.get(
      `https://represent.opennorth.ca/representatives/?point=${lattitude},${longitude}`
    );
    console.log(response.data.objects);
    setReps(response.data.objects);
  };

  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const supportHandler = async () => {
    let response = await axios.post(
      `http://localhost:8080/campaigns/${params.id}/supporters/`,
      {
        supporter: user.username,
      },
      config
    );

    console.log(response);
  };

  useEffect(() => {
    console.log("fetch selected campaign was called");
    fetchSelectedCampaign();
  }, []);

  useEffect(() => {
    getLocation();
    if (lattitude && longitude) {
      fetchRepData();
    }
  }, [lattitude, longitude]);

  return campaign && lattitude && longitude && reps ? (
    <>
      <Row>
        <h1 class="display-4">{campaign.title}</h1>
      </Row>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <h2>Description</h2>
          <p>{campaign.description}</p>
          <Row>
            <h2>Supporters</h2>
            <Button onClick={supportHandler}>Support This Campaign</Button>
          </Row>
          <Row>
            <h2>Comments</h2>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col xs={12} lg={6}>
              <h2>Letter</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
              </p>
            </Col>
            <Col>
              <h2>Recipient</h2>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={reps[18].photo_url} />
                <Card.Body>
                  <Card.Title>{`${reps[18].elected_office} ${reps[18].name}`}</Card.Title>
                  <Card.Link href={`mailto:${reps[18].email}`}>
                    Email: {`${reps[18].email}`}
                  </Card.Link>
                  <a href={reps[18].url}>
                    <Button variant="primary">Website</Button>
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  ) : (
    <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default CampaignPage;
