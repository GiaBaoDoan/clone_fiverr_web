import React, { useState } from "react";
import "./AddLans.scss";
import newRequest from "../../utils/newRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";
import { toast } from "react-toastify";
const AddLans = () => {
  const [secBox, openSecBox] = useState(false);
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const [lan, setLan] = useState({
    languages: "",
    level: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setLan({ ...lan, [name]: value });
  };
  const check = lan.languages === "" || lan.level === "";
  const deleteLan = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/users/lans/${currentUser._id}/${id}`);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Updated successfully !! ");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });
  const addMoreLan = useMutation({
    mutationFn: () => {
      return newRequest.put(`/users/${currentUser._id}`, {
        languages: lan,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["users"]);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      toast.success("Updated successfully !!");
      openSecBox(false);
    },
    onError: (err) => {
      toast.error(err.response.data);
      openSecBox(false);
    },
  });
  return (
    <div className="lans">
      <div className="wrap-edit">
        <div className="edit">
          <span className="title">Languages</span>
          <span
            className="action"
            onClick={() => {
              setLan({ languages: "", level: "" });
              openSecBox(true);
            }}
          >
            Add new
          </span>
        </div>
        {secBox && (
          <form action="" className="form-wrapper">
            <div className="inputs">
              <input
                value={lan.languages}
                name="languages"
                type="text"
                placeholder="Add language"
                onChange={onChange}
              />
              <select value={lan.level} name="level" onChange={onChange} id="">
                <option selected disabled hidden value="">
                  Select an Option
                </option>
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native/Bilingua</option>
              </select>
            </div>
            <div className="buttons">
              <button
                type="button"
                onClick={() => openSecBox(false)}
                className="close"
              >
                Cancel
              </button>
              <button
                style={{
                  opacity: `${check ? "0.2" : "1"}`,
                  cursor: `${check ? "no-drop" : "pointer"}`,
                }}
                type="button"
                disabled={check}
                onClick={() => addMoreLan.mutate()}
                className="update"
              >
                {lan.id ? "Update" : "Add new"}
              </button>
            </div>
          </form>
        )}
        {!secBox && (
          <div className="lan">
            {currentUser?.languages.map((i, index) => {
              return (
                <div style={{ cursor: "pointer" }} className="">
                  <p>
                    <span
                      style={{
                        color: "#212121",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      {i?.languages}
                    </span>{" "}
                    -{" "}
                    <span
                      style={{
                        color: "#62646a",
                        fontSize: "18px",
                        fontWeight: "400",
                      }}
                    >
                      {i?.level}
                    </span>
                    <span
                      onClick={() => {
                        openSecBox(true);
                        setLan({
                          languages: currentUser.languages[index]?.languages,
                          level: currentUser.languages[index]?.level,
                          id: currentUser.languages[index]?._id,
                        });
                      }}
                      className="hint-top"
                      style={{ marginLeft: "10px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </span>
                    <span
                      className="hint-trash"
                      onClick={() => deleteLan.mutate(i._id)}
                      style={{ marginLeft: "10px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        width={18}
                        height={18}
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddLans;
