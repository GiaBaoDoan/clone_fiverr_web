import React, { useContext, useState } from "react";
import "./BecomeSeller.scss";
import { Context } from "../../context/Context";
import upload from "../../utils/upload";
import { toast } from "react-toastify";
import newRequest from "../../utils/newRequest";
const BecomeSeller = ({ setOptions }) => {
  const [loading, setLoading] = useState(false);
  const { user, setUser, file, setFile } = useContext(Context);
  const handleSeller = (e) => {
    setUser({ ...user, isSeller: e.target.checked });
  };
  const handelOnchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const goBack = () => {
    setOptions("signup");
  };
  const handelValidate = () => {
    const { isSeller, phone, desc } = user;
    if (!isSeller || phone === "" || desc === "") {
      return (
        <button
          disabled={true}
          style={{ cursor: "no-drop", background: "gray" }}
          type="submit"
        >
          BecomeSeller
        </button>
      );
    }
    return !loading ? (
      <button>BecomeSeller</button>
    ) : (
      <button
        disabled={true}
        style={{ cursor: "no-drop", background: "gray" }}
        type="submit"
      >
        BecomeSeller
      </button>
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = await upload(file);
    const payload = {
      ...user,
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
      setOptions("login");
      setFile(null);
      setLoading(false);
      toast.success("Sign up successfully !!");
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };
  return (
    <div className="becomeSeller">
      <div className="right">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <span onClick={goBack}>
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
            </svg>
            back
          </span>
          <h1>You can become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input
                value={user.isSeller}
                type="checkbox"
                onChange={handleSeller}
              />
              <span
                style={{ backgroundColor: `${user.isSeller ? "#2196f3" : ""}` }}
                className="slider round"
              ></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            value={user.phone}
            type="text"
            placeholder="+1 234 567 89"
            onChange={(e) => handelOnchange(e)}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            value={user.desc}
            cols="30"
            rows="10"
            onChange={(e) => handelOnchange(e)}
          ></textarea>
          {handelValidate()}
        </form>
      </div>
    </div>
  );
};
export default BecomeSeller;
