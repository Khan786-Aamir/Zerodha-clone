import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/signup", {
        email,
        password,
        username,
      });

      setMessage(res.data.message || "Signup successful");

      // ✅ landing → signin
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center p-5">
      <h2 className="mt-5">Sign Up</h2>

      <Link to="/signin" className="mb-3 d-block">
        Already have an account? <span style={{ color: "blue" }}>Sign In</span>
      </Link>

      <form onSubmit={handleSignUp} style={{ width: "18rem", margin: "0 auto" }}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
