import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import { getCurrentUser } from "../components/getCurrentUser/getCurrentUser";
export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const currentUser = getCurrentUser();
  const [seller, becomeSeller] = useState(false);
  const [countries, setCountries] = useState([]);
  const [authLayout, openAuth] = useState(false);
  const [inbox, openInbox] = useState(false);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    isSeller: false,
    desc: "",
  });
  const contextValue = {
    seller,
    becomeSeller,
    authLayout,
    openAuth,
    user,
    file,
    setFile,
    inbox,
    openInbox,
    setUser,
    countries,
    data,
    setData,
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
