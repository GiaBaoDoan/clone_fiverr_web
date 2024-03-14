import React, { useContext, useState } from "react";
import "./Auth.scss";
import newRequest from "../../utils/newRequest";
import { toast } from "react-toastify";
import ForgotPassword from "../../components/forgotPassword/ForgotPassword";
import Login from "../../pages/login/Login";
import { Context } from "../../context/Context";
import Register from "../../pages/register/Register";
import BecomeSeller from "../becomeSeller/BecomeSellers";

const Auth = () => {
  const { authLayout, openAuth, user, setUser, setFile } = useContext(Context);
  const { forgotPassword, resetPassword } = useState(true);
  const [options, setOptions] = useState("signup");
  const handelInputs = () => {
    const { username, password, country, email } = user;
    if (username == "" || password === "" || country === "" || email == "") {
      return toast.error("Please fill in completely !");
    }
    setOptions("becomeseller");
  };
  return (
    <div className="auth">
      {authLayout && (
        <div>
          <div
            className="overlay"
            onClick={() => {
              openAuth(false);
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
              setFile(null);
            }}
          ></div>
          <div className="auth-layout">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/layout-server/standard.0638957.png"
              alt=""
            />
            {forgotPassword ? (
              <ForgotPassword handelShowError={handelShowError} error={error} />
            ) : (
              <div className="right">
                {options === "login" ? (
                  <Login />
                ) : options === "signup" ? (
                  <Register />
                ) : (
                  ""
                )}
                {options === "login" ? (
                  <div className="options">
                    <span onClick={() => setOptions("signup")}>Sign up</span>
                    <span onClick={() => setOptions("login")}>
                      Forgot password
                    </span>
                  </div>
                ) : options === "signup" ? (
                  <div className="options">
                    <span onClick={() => setOptions("login")}>Sign in</span>
                    <span onClick={handelInputs}>Become seller</span>
                  </div>
                ) : options === "becomeseller" ? (
                  <BecomeSeller setOptions={setOptions} />
                ) : (
                  ""
                )}

                <p className="desc">
                  By joining, you agree to the Fiverr Terms of Service and to
                  occasionally receive emails from us. Please read our Privacy
                  Policy to learn how we use your personal data.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
