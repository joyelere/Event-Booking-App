import React from "react";

import { Button, ButtonGroup } from "react-bootstrap";

const bookingControl = (props) => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <ButtonGroup>
        <Button
          variant={props.activeButton === "list" ? "primary" : "outline-primary"}
          size="sm"
          className="fw-bold"
          onClick={props.onChange.bind(this, "list")}
        >
          List
        </Button>
        <Button
          variant={props.activeButton === "chart" ? "primary" : "outline-primary"}
          size="sm"
          className="fw-bold"
          onClick={props.onChange.bind(this, "chart")}
        >
          Chart
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default bookingControl;
