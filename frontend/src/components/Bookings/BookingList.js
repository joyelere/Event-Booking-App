import React from "react";
import { Card, Button } from "react-bootstrap";

const BookingsList = (props) => {
  return (
    <div className="d-flex flex-column align-items-center mt-4">
      {props.bookings.map((booking) => {
        return (
          <Card key={booking._id} className="w-50 border-primary border-3 mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              {/* Left section */}
              <div>
                <Card.Title className="text-primary fw-bold fs-5 mb-0">
                  {booking.event.title} -{" "}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </Card.Title>
              </div>

              {/* Right section */}
              <div>
                <Button
                  variant="primary"
                  size="sm"
                  className="fw-bold"
                  onClick={props.onDelete.bind(this, booking._id)}
                >
                  Cancel
                </Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default BookingsList;
