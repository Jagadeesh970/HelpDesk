import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../utils/API";
import "./Auth.css";

const RegisterBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, email, password });
      navigate("/login"); 
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" required value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Create Account</button>
      </form>
      <p className="auth-footer">
        Already have an account? <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default RegisterBar;
