import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Store/AuthContext";
import API from "../../utils/API";
import "./Auth.css";

const LoginBar = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { username, password });
      const { token, user } = res.data;

      // Save in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("username", user.username); 

      // Update context
      setUser({
        token,
        role: user.role,
        userId: user._id,
        username: user.username, 
      });

      // Navigate based on role
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "agent") navigate("/agent");
      else navigate("/");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p className="auth-footer">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
};

export default LoginBar;
