import React from "react";
import EventItem from "./EventItem/EventItem";
import { Card } from "react-bootstrap";

const EventList = (props) => {
  const events = props.events.map((event) => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price={event.price}
        date={event.date}
        userId={props.authUserId}
        creatorId={event.creator._id}
        onDetail ={props.onViewDetail}
      />
    );
  });

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      {events.map((event, index) => (
        <Card key={index} className="w-50 border-primary border-3 mb-3">
          {event}
        </Card>
      ))}
    </div>
  );
};

export default EventList;
