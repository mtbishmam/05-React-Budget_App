import React from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  handleBudgetCardAddExpense,
  onClickViewExpenses,
}) {
  const cardClassNames = [];
  if (amount > max) {
    cardClassNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) cardClassNames.push("bg-light");
  return (
    <Card className={cardClassNames.join(" ") + " my-2"}>
      <Card.Body>
        <Card.Title className="d-flex align-items-baseline fw-normal mb-4">
          <div className="me-2">{name}</div>
          <div className="ms-auto">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            variant={getProgressBarVariant(amount, max)}
            className="rounded-pill"
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack
            direction="horizontal"
            className="mt-4 gap-2"
          >
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={handleBudgetCardAddExpense}
            >
              Add Expense
            </Button>
            <Button
              variant="outline-secondary"
              onClick={onClickViewExpenses}
            >
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  if (!max) return null;
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  else if (ratio < 0.75) return "warning";
  return "danger";
}
