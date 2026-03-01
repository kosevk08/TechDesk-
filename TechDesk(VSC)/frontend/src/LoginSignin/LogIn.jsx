import React, { useState } from "react";
import "./login.css";  // we’ll add this CSS next

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password); // call parent handler
  };

  return (
    <div className="inputDiv">
      <form className="inputForm" onSubmit={handleSubmit}>
        <h2>Вход</h2>

        <label htmlFor="email">Имейл</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Въведи имейл"
          required
        />

        <label htmlFor="password">Парола</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Въведи парола"
          required
        />

        <button type="submit">Вход</button>
      </form>
    </div>
  );
}