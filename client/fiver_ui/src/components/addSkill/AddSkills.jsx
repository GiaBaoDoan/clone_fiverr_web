import React, { useEffect, useState } from "react";
import "./AddSkills.scss";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { toast } from "react-toastify";
const AddSkill = ({ openThirBox, thirBox }) => {
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  const [skills, addSkill] = useState({
    skill: "",
    level: "none",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    addSkill({ ...skills, [name]: value });
  };
  // api call
  const addMoreSkill = useMutation({
    mutationFn: () => {
      return newRequest.put(`/users/${currentUser._id}`, {
        skills: skills,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Updated successfully!!");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      openThirBox(false);
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });
  const deleteSkill = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/users/skills/${id}`);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Updated successfully!!");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      openThirBox(false);
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });
  const check = skills.skill === "" || skills.level === "none";
  return (
    <div className="skills">
      <div className="wrap-edit">
        <div className="edit">
          <span className="title">Skills</span>
          <span
            className="action"
            onClick={() => {
              openThirBox(true);
              addSkill({ skill: "", level: "none" });
            }}
          >
            Add new
          </span>
        </div>
        {!thirBox && (
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {currentUser?.skills.map((item, index) => {
              return (
                <p className="skill">
                  {item.skill}
                  <span
                    className="action"
                    onClick={() => {
                      openThirBox(true);
                      addSkill({
                        skill: currentUser.skills[index].skill,
                        level: currentUser.skills[index].level,
                        id: currentUser.skills[index]._id,
                      });
                    }}
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
                    <span
                      className="hint-trash"
                      onClick={() => deleteSkill.mutate(item._id)}
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
                  </span>
                </p>
              );
            })}
          </div>
        )}
        {thirBox && (
          <form action="" className="form-wrapper">
            <div className="inputs">
              <input
                name="skill"
                type="text"
                value={skills.skill}
                onChange={onChange}
                placeholder="Add Skill (e.g Voice Talent)"
              />
              <select
                value={skills.level}
                name="level"
                onChange={onChange}
                id=""
              >
                <option selected disabled hidden value="none">
                  Experience Level
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermidate">Intermidate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  openThirBox(false);
                  addSkill({ skill: "", level: "none" });
                }}
                className="close"
              >
                Cancel
              </button>
              <button
                style={{
                  opacity: `${check ? "0.2" : "1"}`,
                  cursor: `${check ? "no-drop" : "pointer"}`,
                }}
                onClick={() => addMoreSkill.mutate()}
                type="button"
                disabled={check}
                className="update"
              >
                Add new
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddSkill;
