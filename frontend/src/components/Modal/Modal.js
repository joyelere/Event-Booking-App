import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Modal.css";

const ModalContent = ({
  showCreateEvent,
  handleCancel,
  handleConfirm,
  titleRef,
  priceRef,
  dateRef,
  descriptionRef,
  selectedEvent,
  onConfirm,
  confirmText,
}) => {
  return (
    <Modal show={showCreateEvent || selectedEvent} onHide={handleCancel}>
      <Modal.Header closeButton className="modal-title-blue">
        {selectedEvent ? (
          <Modal.Title>{selectedEvent.title}</Modal.Title>
        ) : (
          <Modal.Title>Add Events</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        {selectedEvent ? (
          <>
            <h2 className="mt-3">{selectedEvent.title}</h2>
            <h3 className="mt-3">
              ${selectedEvent.price} -{" "}
              {new Date(selectedEvent.date).toLocaleDateString()}
            </h3>
            <p className="mt-3">{selectedEvent.description}</p>
          </>
        ) : (
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                ref={titleRef}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                ref={priceRef}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Enter date"
                name="date"
                ref={dateRef}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                name="description"
                ref={descriptionRef}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer className="foot">
        <Button variant="primary" size="sm" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={selectedEvent ? onConfirm : handleConfirm}
        >
          {selectedEvent ? confirmText : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalContent;
