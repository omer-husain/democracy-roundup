import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const CampaignCard = ({ campaign }) => {
  return (
    <>
      <Card>
        <Card.Header>
          <Badge bg="warning">{campaign.issue}</Badge>{" "}
          <Badge bg="info">Supporters: {campaign.supporters.length}</Badge>{" "}
        </Card.Header>
        <Card.Body>
          <Card.Title>{campaign.title}</Card.Title>
          <Card.Text>{`${campaign.description.slice(0, 200)}...`}</Card.Text>
          <Button variant="primary">Open Campaign Page</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Badge bg="dark">Expires on: {campaign.expiryDate}</Badge>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CampaignCard;
