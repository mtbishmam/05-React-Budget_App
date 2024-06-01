import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useBudgets } from "./contexts/BudgetsContext";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
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
            onClick={() => setShowAddBudgetModal(true)}
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
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
              ></BudgetCard>
            );
          })}
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      ></AddBudgetModal>
    </>
  );
}

export default App;
