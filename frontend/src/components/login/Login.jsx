import React, { useState, useEffect } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, SetUserId } from "../redux/reducers/auth";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id')
  const token = localStorage.getItem("token");
  const [role , setrole] = useState([])
  
    
 
  
    
 
  const [userInfo, setUserInfo] = useState({
    email: localStorage.getItem("email") || null,
    password: localStorage.getItem("password" || null),
  });
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const handleLogin = () => {
    if (
      Object.values(userInfo)[0] !== null &&
      Object.values(userInfo)[1] !== null
    ) {
      axios
        .post("http://localhost:5000/users/login", userInfo)
        .then((res) => {
          const decoded = jwtDecode(res.data.token);
          setrole(decoded.role_id)
          axios.put(`http://localhost:5000/users/islogin/true/${res.data.userId}`,{}).then((result)=>{
            
            
            
          }).catch((err)=>{
            console.log(err);
            
          })
          dispatch(login(res.data.token));
          dispatch(SetUserId(res.data.userId));
          setMessage(res?.data.message);
          if (rememberMe) {
            localStorage.setItem("email", userInfo.email);
            localStorage.setItem("password", userInfo.password);
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
          }
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.response?.data?.message);
        });
    } else {
      console.log("empty obj", userInfo);
      setMessage("please fill the required fields");
    }
  };
  const isLoggedIn = useSelector((auth) => {
    return auth.auth.isLoggedIn;
  });
  const handleRemMe = (e) => {
    if (e.target.checked) {
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  };
  useEffect(() => {
    if (isLoggedIn && role == 1) {
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
    else if(isLoggedIn && role == 2){
      setTimeout(() => {
        navigate("/Admin/Panel");
      }, 1000);
    }
  });

  return (
    <div>
      <br></br>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        onChange={(e) => {
          setUserInfo({ ...userInfo, email: e.target.value });
        }}
        defaultValue={localStorage.getItem("email") || ""}
      />
      <br></br>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        }}
        defaultValue={localStorage.getItem("password") || ""}
      />
      <br></br>
      <a href="/forget">forget password? </a>
      <br></br>
      <label>
        <input type="checkbox" onChange={handleRemMe} defaultChecked="true" />
       <span> Remember me </span> 
      </label>
      <br></br>
      <button onClick={handleLogin}>login</button>
      <br></br>
          <h4>Don't have an account? <a href="/register">Sign Up</a></h4>
          <p>Or</p>
          <a href="#">login by google</a>
      {isLoggedIn
        ? message && <LoadingOutlined></LoadingOutlined>
        : message && <p className="failed">{message}</p>}
    </div>
  );
};

export default Login;
