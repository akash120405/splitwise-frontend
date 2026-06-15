import { useEffect, useState } from "react";
import api from "../api/api";

export default function ExpenseHistory() {
  const [expenses, setExpenses] =
    useState<any[]>([]);
  const [editingExpenseId, setEditingExpenseId] =
  useState("");

const [editedTitle, setEditedTitle] =
  useState("");

const [editedAmount, setEditedAmount] =
  useState("");

  const groupId =
    localStorage.getItem("groupId") || "";

  const loadExpenses =
    async () => {
      try {
        const res =
          await api.get(
            `/expenses/groups/${groupId}/expenses`
          );

        setExpenses(
          res.data.expenses
        );
      } catch (error) {
        console.error(error);
      }
    };

  const deleteExpense = async (
    expenseId: string
  ) => {
    const confirmDelete =
      window.confirm(
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
  const updateExpense = async (
  expenseId: string
) => {
  try {
    await api.put(
      `/expenses/${expenseId}`,
      {
        title: editedTitle,
        amount: Number(
          editedAmount
        ),
      }
    );

    alert(
      "Expense updated"
    );

    setEditingExpenseId("");

    loadExpenses();
  } catch (error) {
    console.error(error);

    alert(
      "Update failed"
    );
  }
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
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        📜 Expense History
      </h1>

      {expenses.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          No expenses found
        </h2>
      ) : (
        expenses.map(
          (expense) => (
            <div
              key={expense.id}
              style={{
                background:
                  "#16213e",
                borderRadius:
                  "20px",
                padding: "20px",
                marginBottom:
                  "20px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.25)",
              }}
            >
              {editingExpenseId ===
expense.id ? (
  <input
    value={editedTitle}
    onChange={(e) =>
      setEditedTitle(
        e.target.value
      )
    }
  />
) : (
  <h2>
    {expense.title}
  </h2>
)}

              {editingExpenseId ===
expense.id ? (
  <input
    value={editedAmount}
    onChange={(e) =>
      setEditedAmount(
        e.target.value
      )
    }
  />
) : (
  <p>
    💰 Amount: ₹
    {expense.amount}
  </p>
)}

              <p>
                👤 Paid By:{" "}
                {
                  expense.paidBy
                    ?.name
                }
              </p>

              <p>
                📊 Split:{" "}
                {
                  expense.splitType
                }
              </p>

              <p>
                📅 Date:{" "}
                {new Date(
                  expense.createdAt
                ).toLocaleString()}
              </p>

              <hr />

              <h4>
                Participants
              </h4>

              {expense.participants
                ?.length === 0 ? (
                <p>
                  No participants
                </p>
              ) : (
                expense.participants?.map(
                  (
                    p: any
                  ) => (
                    <div
                      key={p.id}
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        padding:
                          "5px 0",
                      }}
                    >
                      <span>
                        {
                          p.user
                            ?.name
                        }
                      </span>

                      <span>
                        ₹
                        {
                          p.owedAmount
                        }
                      </span>
                    </div>
                  )
                )
              )}

              <div
                style={{
                  display:
                    "flex",
                  gap: "10px",
                  marginTop:
                    "20px",
                }}
              >
                <button
                  onClick={() =>
                    deleteExpense(
                      expense.id
                    )
                  }
                  style={{
                    background:
                      "#dc2626",
                    color:
                      "white",
                    border:
                      "none",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                    fontWeight:
                      "bold",
                    flex: 1,
                  }}
                >
                  🗑 Delete
                </button>

                {editingExpenseId ===
expense.id ? (
  <button
    onClick={() =>
      updateExpense(
        expense.id
      )
    }
  >
    💾 Save
  </button>
) : (
  <button
    onClick={() => {
      setEditingExpenseId(
        expense.id
      );

      setEditedTitle(
        expense.title
      );

      setEditedAmount(
        expense.amount
      );
    }}
  >
    ✏ Edit
  </button>
)}
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}