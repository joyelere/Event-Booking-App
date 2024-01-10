import React from "react";
import { Card, Button } from "react-bootstrap";

const EventItem = (props) => {
  return (
    <Card.Body
      className="d-flex justify-content-between align-items-center"
      key={props.eventId}
    >
      {/* Left section */}
      <div>
        <Card.Title className="text-primary fw-bold fs-3 mb-0">
          {props.title}
        </Card.Title>
        <Card.Subtitle className="mt-0">
          ${props.price} - {new Date(props.date).toLocaleDateString()}
        </Card.Subtitle>
      </div>

      {/* Right section */}
      <div>
        {props.userId === props.creatorId ? (
          <Card.Text className="fw-bold">
            You are the owner of this event
          </Card.Text>
        ) : (
          <Button
            variant="primary"
            size="sm"
            className="fw-bold"
            onClick={props.onDetail.bind(this, props.eventId)}
          >
            View Details
          </Button>
        )}
      </div>
    </Card.Body>
  );
};

export default EventItem;
