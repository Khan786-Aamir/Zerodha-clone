import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoggingIn(true);

      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        navigate("/");
      }

      setMessage(response.data.message || "Login successful");
      setTimeout(() => setMessage(""), 5000);
      setLoggingIn(false);
    } catch (error) {
      console.error(error);
      setLoggingIn(false);
      setMessage("Sign In failed!");
    }
  };

  return (
    <div className="container text-center p-5">
      <div className="row">
        <h1 style={{ fontSize: "3rem", opacity: "0.85", marginTop: "5rem" }}>
          Open a free demat and trading account
        </h1>
        <h3 style={{ opacity: "0.85", fontSize: "1.3rem", marginBottom: "2.5rem" }}>
          Start investing brokerage free
        </h3>
      </div>

      <div className="row p-5">
        <div className="col-6 p-5">
          <img
            style={{ height: "47vh", width: "35vw" }}
            src="media/images/account_open.png"
            alt="logo"
          />
        </div>

        <div className="col-6">
          <h2 className="p-3 mt-5">Log In</h2>

          <Link to="/signup" className="mb-5 d-block">
            Don’t have an account? <span style={{ color: "blue" }}>Sign Up</span>
          </Link>

          <form onSubmit={handleSignIn} style={{ width: "17rem", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control mb-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control mb-3"
            />

            {message && <div style={{ color: "red" }}>{message}</div>}

            <button type="submit" className="btn btn-primary w-100 mt-3">
              {loggingIn ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
