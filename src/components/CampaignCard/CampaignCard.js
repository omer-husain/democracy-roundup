import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CampaignCard.scss";
import moment from "moment";
import Moment from "react-moment";


const CampaignCard = ({ campaign }) => {
  const handleClick = () => {};

  return (
    <>
      <Card>
        <Card.Header className="badges">
          <div>
            <Badge bg="danger">{campaign.issue}</Badge>{" "}
            <Badge bg="success">Supporters: {campaign.supporters.length}</Badge>{" "}
            <Badge bg="primary">{campaign.representative}</Badge>{" "}
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{campaign.title}</Card.Title>
          <Card.Text>{`${campaign.description}...`}</Card.Text>
          <Link to={`/campaigns/${campaign._id}`}>
            <Button variant="primary">Open Campaign Page</Button>
          </Link>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="card-footer">
            <Badge bg="dark">
              Expires on:
              <Moment format="YYYY/MM/DD">{campaign.expiryDate}</Moment>
            </Badge>
            <Badge bg="warning">
              <Moment
                duration={campaign.createdAt}
                date={campaign.expiryDate}
              />
            </Badge>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CampaignCard;
