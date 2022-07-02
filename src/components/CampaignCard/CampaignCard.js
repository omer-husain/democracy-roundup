import React from "react";
import { Card, Button } from "react-bootstrap";

const CampaignCard = ({ campaign }) => {
  return (
    <>
      <Card>
        <Card.Header>{campaign.issue}</Card.Header>
        <Card.Body>
          <Card.Title>{campaign.title}</Card.Title>
          <Card.Text>{campaign.description}</Card.Text>
          <Button variant="primary">Open Campaign Page</Button>
        </Card.Body>
        <Card.Footer className="text-muted">Expires on: {campaign.expiryDate}</Card.Footer>
      </Card>
    </>
  );
};

export default CampaignCard;
