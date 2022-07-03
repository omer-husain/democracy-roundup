import React from "react";
import CampaignCard from "../CampaignCard/CampaignCard";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CampaignList = ({ campaigns }) => {
  return (
    <>
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
