import React, { useEffect } from "react";
import CampaignCard from "../CampaignCard/CampaignCard";
import { Col, Row, Button, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import AlertDismissible from "../AlertDismissible/AlertDismissible";

const CampaignList = ({ campaigns }) => {
  const location = useLocation();

  const { message, about } = (location && location.state) || {};

  return (
    <>
      {message && <AlertDismissible whatHappened={about} message={message} />}
      <Row>
        <h1>Campaigns</h1>
      </Row>
      <Row>
        <h1>
          <Link to="/new">
            <Button variant="success">Create Your Campaign!</Button>
          </Link>
        </h1>
      </Row>
      <Row>
        {campaigns.map((campaign) => {
          return <CampaignCard campaign={campaign}></CampaignCard>;
        })}
      </Row>
    </>
  );
};

export default CampaignList;
