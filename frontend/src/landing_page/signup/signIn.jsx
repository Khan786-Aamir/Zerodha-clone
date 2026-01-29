import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/login", { email, password });

      setMessage(res.data.message || "Login successful");

      // ✅ LANDING → DASHBOARD (FULL URL)
      setTimeout(() => {
        window.location.href =
          "https://zerodha-dashboard.onrender.com";
      }, 800);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Sign In failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center p-5">
      <h2 className="mt-5">Sign In</h2>

      <Link to="/signup" className="mb-3 d-block">
        Don’t have an account? <span style={{ color: "blue" }}>Sign Up</span>
      </Link>

      <form onSubmit={handleSignIn} style={{ width: "18rem", margin: "0 auto" }}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && <p style={{ color: "red" }}>{message}</p>}

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
