import React from "react";
import "./MyRepresentatives.scss";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { Spinner } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const MyRepresentatives = () => {
  let params = useParams();
  const [campaign, setCampaign] = useState({});
  const [lattitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [reps, setReps] = useState([]);

  async function getLocation() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getLocation();
    if (lattitude && longitude) {
      fetchRepData();
    }
  }, [lattitude, longitude]);

  function showPosition(position) {
    setLattitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  const fetchRepData = async () => {
    console.log("fetch reps data was called");

    // https://represent.opennorth.ca/representatives/?point=45.524,-73.596&format=apibrowser

    let response = await axios.get(
      `https://represent.opennorth.ca/representatives/?point=${lattitude},${longitude}`
    );
    console.log(response.data.objects);
    let filteredList = response.data.objects.filter((item) => {
      return item.photo_url;
    });
    setReps([...filteredList]);
  };

  return reps.length > 0 ? (
    <div className="myreps">
      <h1>My Representatives</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {reps.map((rep) => (
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={rep.photo_url} />
              <Card.Body>
                <Card.Title>{`${rep.elected_office} ${rep.name}`}</Card.Title>
                <Card.Link href={`mailto:${rep.email}`}>
                  Email: {`${rep.email}`}
                </Card.Link>
                <a href={rep.url}>
                  <Button variant="primary">Website</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  ) : (
    <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading....</span>
      </Spinner>
    </>
  );
};

export default MyRepresentatives;
