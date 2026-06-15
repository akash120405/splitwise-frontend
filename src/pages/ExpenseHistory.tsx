import { useEffect, useState } from "react";
import api from "../api/api";

export default function ExpenseHistory() {
  const [expenses, setExpenses] = useState<any[]>([]);

  const groupId =
    localStorage.getItem("groupId") || "";

  const loadExpenses = async () => {
    try {
      const res = await api.get(
        `/expenses/groups/${groupId}/expenses`
      );

      setExpenses(res.data.expenses || []);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExpense = async (
    expenseId: string
  ) => {
    const confirmDelete = window.confirm(
      "Delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/expenses/${expenseId}`
      );

      await loadExpenses();

      alert(
        "Expense deleted successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete expense"
      );
    }
  };

  const editExpense = (
    expenseId: string
  ) => {
    alert(
      `Edit Expense: ${expenseId}`
    );

    // later:
    // navigate(`/expenses/edit/${expenseId}`)
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        color: "white",
      }}
    >
      <h1 style={{ color: "red" }}>
  TEST VERSION
</h1>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "52px",
          fontWeight: "bold",
        }}
      >
        📜 Expense History
      </h1>

      {expenses.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            color: "#9ca3af",
          }}
        >
          No expenses found
        </h2>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense.id}
            style={{
              background: "#16213e",
              borderRadius: "20px",
              padding: "25px",
              marginBottom: "25px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.25)",
            }}
          >
            <h2
              style={{
                marginBottom: "15px",
              }}
            >
              {expense.title}
            </h2>

            <p>
              💰 Amount: ₹{expense.amount}
            </p>

            <p>
              👤 Paid By:{" "}
              {expense.paidBy?.name}
            </p>

            <p>
              📊 Split:{" "}
              {expense.splitType}
            </p>

            <p>
              📅 Date:{" "}
              {new Date(
                expense.createdAt
              ).toLocaleString()}
            </p>

            <hr
              style={{
                margin: "20px 0",
              }}
            />

            <h3>Participants</h3>

            {!expense.participants ||
            expense.participants.length ===
              0 ? (
              <p
                style={{
                  color: "#9ca3af",
                }}
              >
                No participants found
              </p>
            ) : (
              expense.participants.map(
                (p: any) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      padding: "8px 0",
                    }}
                  >
                    <span>
                      {p.user?.name}
                    </span>

                    <span>
                      ₹{p.owedAmount}
                    </span>
                  </div>
                )
              )
            )}

            {/* ACTION BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() =>
                  editExpense(
                    expense.id
                  )
                }
                style={{
                  flex: 1,
                  background:
                    "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✏ Edit
              </button>

              <button
                onClick={() =>
                  deleteExpense(
                    expense.id
                  )
                }
                style={{
                  flex: 1,
                  background:
                    "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}