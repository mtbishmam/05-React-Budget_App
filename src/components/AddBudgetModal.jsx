import React, { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group
            controlId="name"
            className="mb-3"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group
            controlId="max"
            className="mb-3"
          >
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              step={0.01}
              ref={maxRef}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
