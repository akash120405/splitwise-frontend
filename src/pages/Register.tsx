import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const register = async () => {
    try {
      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Registration Failed");
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
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

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

      <button
        onClick={register}
      >
        Register
      </button>
    </div>
  );
}