import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetsContext";

export default function TotalBudgetCard() {
  const { budgets, expenses } = useBudgets();

  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  return (
    <BudgetCard
      name="Total"
      amount={amount}
      max={max}
      gray
      hideButtons
    ></BudgetCard>
  );
}
