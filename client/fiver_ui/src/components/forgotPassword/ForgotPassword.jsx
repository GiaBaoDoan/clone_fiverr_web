import React, { useRef, useState } from "react";
import "./ForgotPassword.scss";
const ForgotPassword = ({ error, handelShowError }) => {
  const [email, setEmail] = useState();
  return (
    <div className="resetPassword">
      <div className="right">
        <div className="wrapInputs">
          <p className="back">
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
              class="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>{" "}
            <span>Back</span>
          </p>
          <h1>Type your email to reset password</h1>
          <label htmlFor="">Enter your email</label>
          <div className="group">
            <input
              onChange={() => setEmail(e.target.value)}
              name="username"
              type="text"
              placeholder=""
            />
            {handelShowError()}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button>Enter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
