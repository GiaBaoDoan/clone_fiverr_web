import React, { useContext, useEffect, useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
import validator from "validator";
function Register() {
  const [loading, setLoading] = useState(false);
  const [messageError, setErrorMessage] = useState({
    email: "",
    password: "",
    username: "",
  });
  const validatePassword = (password) => {
    if (!validator.isLength(password, { min: 8 })) {
      setErrorMessage({
        ...messageError,
        password: "Password must be at least 8 characters long !!",
      });
    } else if (!/\d/.test(password)) {
      setErrorMessage({
        ...messageError,
        password: "Password must contain at least one digit !!",
      });
    } else if (!/[a-z]/.test(password)) {
      setErrorMessage({
        ...messageError,
        password: "Password must contain at least one lowercase letter",
      });
    } else if (!/[A-Z]/.test(password)) {
      setErrorMessage({
        ...messageError,
        password: "Password must contain at least one uppercase letter",
      });
    } else {
      setErrorMessage({ ...messageError, password: "" });
    }
  };
  const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
      setErrorMessage({ ...messageError, email: "Invalid email !!" });
    } else {
      setErrorMessage({ ...messageError, email: "" });
    }
  };
  const validateUsername = (username) => {
    if (!validator.isLength(username, { min: 5 })) {
      setErrorMessage({
        ...messageError,
        username: "user name must be at least 5 characters long !!",
      });
    } else {
      setErrorMessage({
        ...messageError,
        username: "",
      });
    }
  };
  const { user, setUser, file, setFile, countries, setOptions } =
    useContext(Context);
  const handelValidate = () => {
    const { img, desc, isSeller, phone, ...other } = user;
    for (let key in other) {
      if (
        other[key] == "" ||
        messageError.email !== "" ||
        messageError.password !== "" ||
        messageError.username !== ""
      ) {
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
    }
    return !loading ? (
      <button type="submit">Sign up</button>
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      if (value !== "") {
        validatePassword(value);
      } else {
        setErrorMessage({ ...messageError, [name]: "" });
      }
    } else if (name === "email") {
      if (value !== "") {
        validateEmail(value);
      } else {
        setErrorMessage({ ...messageError, [name]: "" });
      }
    } else if (name === "username") {
      if (value !== "") {
        validateUsername(value);
      } else {
        setErrorMessage({ ...messageError, [name]: "" });
      }
    }
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = await upload(file);
    const payload = {
      ...user,
      isSeller: false,
      img: file ? url : "",
    };
    try {
      const res = await newRequest.post("/auth/register", payload);
      setUser({
        username: "",
        email: "",
        password: "",
        img: "",
        country: "",
        phone: "",
        isSeller: false,
        desc: "",
      });
      setLoading(false);
      setOptions("login");
      setFile(null);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <div className="wrapInputs">
            <div>
              <label htmlFor="">Email</label>
              <input
                name="email"
                type="email"
                value={user.email}
                placeholder="email"
                onChange={handleChange}
              />
              <span className="messageError">{messageError.email}</span>
            </div>
            <div>
              <label htmlFor="">Username</label>
              <input
                value={user.username}
                name="username"
                type="text"
                placeholder="johndoe"
                onChange={handleChange}
              />
              <span className="messageError">{messageError.username}</span>
            </div>
          </div>
          <div className="wrapInputs">
            <div>
              <label htmlFor="">Password</label>
              <input
                name="password"
                value={user.password}
                type="password"
                onChange={handleChange}
              />
              <span className="messageError">{messageError.password}</span>
            </div>
            <div>
              <label htmlFor="">Country</label>
              <select
                onChange={handleChange}
                className="listCountries"
                name="country"
              >
                {countries?.map((country, index) => {
                  return (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="wrapInputs">
            <div>
              <label htmlFor="">Profile Picture (optional)</label>
              <span>{file && file.name}</span>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
          </div>
          {handelValidate()}
        </div>
      </form>
    </div>
  );
}

export default Register;
