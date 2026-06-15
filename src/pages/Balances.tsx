import { useState } from "react";
import api from "../api/api";

export default function Balances() {
  const [balances, setBalances] =
    useState<any[]>([]);

  const groupId =
    localStorage.getItem("groupId") || "";

  const loadBalances = async () => {
    try {
      const res = await api.get(
        `/groups/${groupId}/balances`
      );

      console.log(
        "Balances Response:",
        res.data
      );

      // NEW BACKEND FORMAT
      if (
        Array.isArray(
          res.data.balances
        )
      ) {
        setBalances(
          res.data.balances
        );
      }

      // OLD BACKEND FORMAT
      else {
        const temp =
          Object.entries(
            res.data.balances || {}
          ).map(
            ([
              userId,
              balance,
            ]) => ({
              userId,
              name: userId,
              email: "",
              balance,
            })
          );

        setBalances(temp);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to load balances"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          marginBottom: "30px",
        }}
      >
        💰 Group Balances
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={loadBalances}
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",
            border: "none",
            color: "white",
            padding:
              "14px 30px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Load Balances
        </button>
      </div>

      {balances.length === 0 && (
        <div
          style={{
            textAlign:
              "center",
            color: "#9ca3af",
          }}
        >
          No balances loaded
        </div>
      )}

      {balances.map(
        (user: any) => (
          <div
            key={user.userId}
            style={{
              background:
                user.balance >= 0
                  ? "linear-gradient(135deg,#14532d,#166534)"
                  : "linear-gradient(135deg,#7f1d1d,#991b1b)",

              padding:
                "25px",

              borderRadius:
                "18px",

              marginBottom:
                "20px",

              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              boxShadow:
                "0 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  width: "55px",
                  height:
                    "55px",
                  borderRadius:
                    "50%",
                  background:
                    "white",
                  color:
                    "#111827",
                  display:
                    "flex",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                  fontWeight:
                    "bold",
                  fontSize:
                    "22px",
                }}
              >
                {user.name
                  ?.charAt(0)
                  .toUpperCase() ||
                  "U"}
              </div>

              <div>
                <h2
                  style={{
                    margin:
                      0,
                  }}
                >
                  {user.name}
                </h2>

                {user.email && (
                  <p
                    style={{
                      margin:
                        "5px 0 0 0",
                      color:
                        "#d1d5db",
                    }}
                  >
                    {
                      user.email
                    }
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                textAlign:
                  "right",
              }}
            >
              {user.balance >=
              0 ? (
                <>
                  <div
                    style={{
                      color:
                        "#86efac",
                      fontSize:
                        "14px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    TO RECEIVE
                  </div>

                  <div
                    style={{
                      fontSize:
                        "28px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    + ₹
                    {Math.abs(
                      Number(
                        user.balance
                      )
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      color:
                        "#fca5a5",
                      fontSize:
                        "14px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    TO PAY
                  </div>

                  <div
                    style={{
                      fontSize:
                        "28px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    - ₹
                    {Math.abs(
                      Number(
                        user.balance
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}