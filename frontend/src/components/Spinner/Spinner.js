import React from "react";
import { Spinner } from "react-bootstrap";

const spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-2">
      <Spinner animation="border" variant="primary"/>;
    </div>
  );
};

export default spinner;
