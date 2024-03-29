import React, { useEffect, useState } from "react";
import CampaignCard from "../CampaignCard/CampaignCard";
import { Col, Row, Button, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import AlertDismissible from "../AlertDismissible/AlertDismissible";

import "./CampaignList.scss";


const CampaignList = ({ campaigns }) => {
  const location = useLocation();
  const [supporters, setSupporters] = useState([]);



  const { message, about } = (location && location.state) || {};

  return (
    <div className="campaigns-list">
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
    </div>
  );
};

export default CampaignList;
