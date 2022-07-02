import React from "react";
import CampaignCard from "../CampaignCard/CampaignCard";
import { Col, Row, Button } from "react-bootstrap";

const CampaignList = ({ campaigns }) => {
  return (
    <>
      <Row>
        <h1>Campaigns</h1>
      </Row>
      <Row>
        <h1>
          <Button variant="success">Create Your Campaign!</Button>
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
