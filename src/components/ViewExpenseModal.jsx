import React from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpenseModal({ show, handleClose, budgetId }) {
  const { budgets, expenses, deleteBudget, deleteExpense } = useBudgets();
  const budget =
    budgetId === UNCATEGORIZED_BUDGET_ID
      ? { name: "Uncategorized", id: budgetId }
      : budgets.find((b) => b.id === budgetId);
  if (budget == null) return null;
  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="me-2">Expenses - {budget?.name}</Modal.Title>
        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
          <Button
            variant="outline-danger"
            onClick={() => {
              deleteBudget(budget.id);
              handleClose();
            }}
          >
            Delete
          </Button>
        )}
      </Modal.Header>
      <Modal.Body>
        <Stack
          direction="vertical"
          className="gap-3"
        >
          {expenses
            .filter((expense) => expense.budgetId === budgetId)
            .map((expense) => (
              <Stack
                direction="horizontal"
                key={expense.id}
              >
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5 me-2">
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteExpense(expense.id)}
                >
                  &times;
                </Button>
              </Stack>
            ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
