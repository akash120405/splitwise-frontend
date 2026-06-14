import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const login = async () => {
    try {
      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        width: "300px",
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button onClick={login}>
        Login
      </button>

      <button
        onClick={() =>
          navigate("/register")
        }
      >
        Register
      </button>
    </div>
  );
}