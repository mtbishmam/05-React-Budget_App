import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();

  function handleBudgetCardAddExpense(id) {
    setShowAddExpenseModal(true);
    if (id == null) setAddExpenseBudgetId(UNCATEGORIZED_BUDGET_ID);
    else setAddExpenseBudgetId(id);
  }
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
          <Button
            variant="outline-primary"
            onClick={handleBudgetCardAddExpense}
          >
            Add Expense
          </Button>
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
                handleBudgetCardAddExpense={() =>
                  handleBudgetCardAddExpense(budget.id)
                }
              ></BudgetCard>
            );
          })}
          <UncategorizedBudgetCard
            handleBudgetCardAddExpense={handleBudgetCardAddExpense}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      ></AddBudgetModal>
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultValue={addExpenseBudgetId}
      ></AddExpenseModal>
    </>
  );
}

export default App;
