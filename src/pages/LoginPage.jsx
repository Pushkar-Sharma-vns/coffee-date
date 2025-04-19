import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/LoginPage.css';
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const apiUrl = 'http://127.0.0.1:8065';

  const admin_name = ['Tanisha', 'Gnan', 'Swati', 'Anisha', 'Ashakiran']
  const admin_password = 'Pushkar'

  const navigate = useNavigate();


  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setLoginMessage('Please enter both email and password!');
      return;
    }

    try {
    //   const response = await axios.post(`${apiUrl}/login`, { email, password });
      if (admin_name.includes(email) && password==admin_password){
        localStorage.setItem('her_name', email)
        localStorage.setItem('logged_in', email)

    //   if (response.data && response.data.success) {
        setLoginMessage('Welcome Back! 🌟');
        // Clearly handle successful authentication:
        // Save tokens, states, navigate etc.
        navigate("/coffee-invite")
      } else {
        setLoginMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setLoginMessage('Something went wrong. Please try later.');
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="login-title">Pushkar have something to ask from you, please enter your name and password!!</h4>

        <input
          className="login-input"
          type="email"
          placeholder="Your Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          className="login-input"
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>

        {loginMessage && <div className="login-message">{loginMessage}</div>}

        {/* <p className="login-footer">
          Forgot password? <a href="#">Reset here</a>
        </p> */}

      </motion.div>
    </div>
  );
}

export default LoginPage;