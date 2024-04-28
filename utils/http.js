import axios from "axios";

const BACKEND_URL = "https://test-6e041-default-rtdb.firebaseio.com/";

// --------------- Expense ----------------------
export async function storeCharacterInfo(characterInfo) {
  // const
  const response = await axios.post(
    BACKEND_URL + "/characters.json",
    characterInfo
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

// --------------- Income ----------------------
export async function storeIncome(incomeData) {
  const response = await axios.post(BACKEND_URL + "/incomes.json", incomeData);
  const id = response.data.name;
  return id;
}

export async function fetchIncomes() {
  const response = await axios.get(BACKEND_URL + "/incomes.json");

  const incomes = [];

  for (const key in response.data) {
    const incomeObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    incomes.push(incomeObj);
  }
  return incomes;
}

export function updateIncome(id, incomeData) {
  return axios.put(BACKEND_URL + `/incomes/${id}.json`, incomeData);
}

export function deleteIncome(id) {
  return axios.delete(BACKEND_URL + `/incomes/${id}.json`);
}
