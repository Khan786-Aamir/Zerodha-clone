import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoggingIn(true);

      const response = await axios.post(`${API_BASE_URL}/signup`, {
        email,
        password,
        username,
      });

      if (response.status === 201 || response.status === 200) {
        navigate("/signin");
      }

      setMessage(response.data.message || "Signup successful");
      setTimeout(() => setMessage(""), 5000);
      setLoggingIn(false);
    } catch (error) {
      console.error(error);
      setLoggingIn(false);
      setMessage("Sign Up failed!");
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
          <h2 className="p-3 mt-5">Sign Up</h2>

          <Link to="/signin" className="mb-5 d-block">
            Already have an account? <span style={{ color: "blue" }}>Sign In</span>
          </Link>

          <form onSubmit={handleSignUp} style={{ width: "17rem", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control mb-3"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              {loggingIn ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
