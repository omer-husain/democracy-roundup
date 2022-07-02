import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CampaignCard.scss";

const CampaignCard = ({ campaign }) => {
  const handleClick = () => {};

  return (
    <>
      <Card>
        <Card.Header className="badges">
          <div>
            <Badge bg="warning">{campaign.issue}</Badge>{" "}
            <Badge bg="info">Supporters: {campaign.supporters.length}</Badge>{" "}
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{campaign.title}</Card.Title>
          <Card.Text>{`${campaign.description.slice(0, 200)}...`}</Card.Text>
          <Link to={`/campaigns/${campaign._id}`}>
            <Button variant="primary">Open Campaign Page</Button>
          </Link>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Badge bg="dark">Expires on: {campaign.expiryDate}</Badge>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CampaignCard;
