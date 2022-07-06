import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import "./CampaignPage.scss";
import Moment from "react-moment";
import MyVerticallyCenteredModal from "../MyVerticallyCenteredModal/MyVerticallyCenteredModal";

const CampaignPage = ({ user }) => {
  let params = useParams();
  const [campaign, setCampaign] = useState({});
  const [rep, setRep] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const fetchSelectedCampaign = async () => {
    let response = await axios.get(
      `http://localhost:8080/campaigns/${params.id}`
    );
    console.log(response.data);
    console.log(params.id);
    setCampaign({ ...response.data });
    console.log(campaign);
  };

  useEffect(() => {
    console.log("fetch selected campaign was called");
    fetchSelectedCampaign();
  }, []);

  useEffect(() => {
    fetchRepData();
  }, [campaign]);

  const fetchRepData = async () => {
    console.log("fetch rep data was called");
    const fullName = campaign.representative;
    const [first, last] = fullName.split(" ");
    console.log(last);

    let response = await axios.get(
      `https://represent.opennorth.ca/representatives/house-of-commons/?last_name=${last}`
    );
    console.log(response.data.objects);
    setRep({ ...response.data.objects[0] });
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
        myParamsId: params.id,
      },
      config
    );

    console.log(response);
    setModalShow(true);
  };

  // console.log(campaign, rep);

  return rep ? (
    <div className="campaign">
      <Row>
        <h1 class="display-2">{campaign.title}</h1>
      </Row>
      <Row>
        <Col xs={12} md={6} lg={3}>
          <div className="campaign__description">
            <h2>Description</h2>
            <p>{campaign.description}</p>
          </div>
          <Row>
            <h2>Supporters</h2>
            <Button onClick={supportHandler}>Support This Campaign</Button>
            {campaign.supporters.map((supporter) => {
              return <h1>{supporter.person._id}</h1>;
            })}
            \
          </Row>
        </Col>
        <Col>
          <Row>
            <Col xs={12} lg={6}>
              <h2>Letter</h2>
              <div className="campaign__letter letterpress">
                <p>
                  <Moment format="LL" />
                  <br />
                  <br /> Hon. {rep.name} <br />
                  {rep.offices[1].postal && rep.offices[1].postal} <br />
                  {rep.offices[1].postal && rep.offices[1].tel}
                  <br />
                  <br /> Dear Hon. {rep.name}, <br /> My name is{" "}
                  {campaign.organiser.username} and I am a constituent. I am
                  writing this letter with a great deal of concern.{" "}
                  {campaign.description}. We have organised an awarness campaign
                  and below this letter you will see the names of fellow
                  supporters and constituents who feel as strongly as I do.
                  Thank you for taking the time to listen to my concerns, and I
                  look forward to receiving a response from you on this matter.{" "}
                  <br />
                  <br />
                  Sincerely, {campaign.organiser.username} <br />
                  {campaign.organiser.email}
                  {/* (City, Province) (Phone Number){" "} */}
                </p>
              </div>
            </Col>
            <Col>
              <h2>Recipient</h2>
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
          </Row>
        </Col>
      </Row>
      <MyVerticallyCenteredModal
        titleModal={"Added Supporter To Campaign"}
        message={`Thank you, your name will be added to the letter`}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />{" "}
    </div>
  ) : (
    <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default CampaignPage;
