import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";

function App() {
  return (
    <>
      <Container>
        <Stack
          direction="horizontal"
          className="my-4 gap-2"
        >
          <h1>Budgets</h1>
          <Button
            variant="primary"
            className="ms-auto"
          >
            Add Budget
          </Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          <BudgetCard
            name="Entertainment"
            amount={300}
            max={400}
          ></BudgetCard>
        </div>
      </Container>
    </>
  );
}

export default App;
