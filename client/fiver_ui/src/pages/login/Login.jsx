import React, { useContext, useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const { openAuth } = useContext(Context);
  const [error, setError] = useState();
  const [info, setInfor] = useState({
    username: "",
    password: "",
  });
  const handelInfor = (e) => {
    setError(null);
    const { name, value } = e.target;
    setInfor({ ...info, [name]: value });
  };
  const handelShowError = () => {
    return (
      error && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-alert-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      )
    );
  };
  const handelValidate = () => {
    const { username, password } = info;
    if (username === "" || password === "") {
      return (
        <button
          disabled={true}
          style={{ cursor: "no-drop", background: "gray" }}
          type="submit"
        >
          Sign up
        </button>
      );
    }
    return !loading ? (
      <button>Sign up</button>
    ) : (
      <button
        disabled={true}
        style={{ cursor: "no-drop", background: "gray" }}
        type="submit"
      >
        Sign up
      </button>
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await newRequest.post("/auth/login", info);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      openAuth(false);
      toast.success("Login successfully!");
      setInfor({ username: "", password: "" });
      setLoading(false);
    } catch (err) {
      setError(err.response.data);
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit}>
        <h1>Continue with your email or username</h1>
        <label htmlFor="">Email or username</label>
        <div className="group">
          <input
            style={{ borderColor: `${error ? "#f74040" : ""} ` }}
            name="username"
            type="text"
            placeholder=""
            onChange={(e) => handelInfor(e)}
          />
          <span>{handelShowError()}</span>
        </div>
        <label htmlFor="">Password</label>
        <div className="group">
          <input
            style={{ borderColor: `${error ? "#f74040" : ""} ` }}
            name="password"
            type="password"
            onChange={(e) => handelInfor(e)}
          />
          <span>{handelShowError()}</span>
        </div>
        {error && <span className="error">{error}</span>}
        {handelValidate()}
      </form>
    </div>
  );
};

export default Login;
