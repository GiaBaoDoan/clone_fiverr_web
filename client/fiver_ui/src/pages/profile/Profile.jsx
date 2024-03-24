import React, { useRef, useState } from "react";
import "./Profile.scss";
import { getCurrentUser } from "../../components/getCurrentUser/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddSkill from "../../components/addSkill/AddSkills";
import newRequest from "../../utils/newRequest";
import { toast } from "react-toastify";
import moment from "moment";
import AddLans from "../../components/addLan/AddLans";
const Profile = () => {
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  const desc = useRef();
  const [fristBox, openFristBox] = useState(false);
  const [thirBox, openThirBox] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });
  const updateDescUser = useMutation({
    mutationFn: () => {
      return newRequest.put(`/users/${currentUser._id}`, {
        desc: desc.current.value,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["users"]);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      toast.success("Updated successfully !! ");
      openFristBox(false);
    },
    onError: (err) => {
      toast.error(err.response.data);
      openFristBox(false);
    },
  });
  return (
    <div className="profile">
      <div className="container">
        <div className="left">
          <div className="info">
            <div className="wrap-online">
              <div className="online">
                <div className="dot"></div>
                <div className="tag">
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="wrap-images">
              <div className="images">
                <img src={currentUser.img} alt="" />
              </div>
            </div>
            <div className="username">
              <div className="wrap-user">
                <span className="name">Display your name</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.3628 2.30102L13.6796 0.618553C12.8553 -0.205791 11.521 -0.205916 10.6965 0.618522L0.778434 10.4718L0.0102775 15.1279C-0.0733163 15.6346 0.365528 16.0736 0.872371 15.99L5.52846 15.2218L15.3824 5.30374C16.2052 4.4809 16.2131 3.15127 15.3628 2.30102ZM6.26384 9.7364C6.39809 9.87065 6.57406 9.93774 6.75 9.93774C6.92593 9.93774 7.1019 9.87065 7.23615 9.7364L10.9558 6.01671L11.8486 6.90949L6.5625 12.2301V10.9377H5.0625V9.43774H3.77012L9.09072 4.15165L9.9835 5.04443L6.26381 8.76408C5.9954 9.03258 5.9954 9.4679 6.26384 9.7364ZM2.56662 14.3169L1.6834 13.4336L2.06278 11.1341L2.63778 10.5627H3.9375V12.0627H5.4375V13.3624L4.86618 13.9375L2.56662 14.3169ZM14.4099 4.33146L14.4083 4.33305L14.4067 4.33465L12.9058 5.8454L10.1548 3.09446L11.6656 1.59352L11.6672 1.59196L11.6687 1.5904C11.9546 1.30458 12.418 1.30105 12.7073 1.59037L14.3903 3.2733C14.699 3.58196 14.7009 4.04046 14.4099 4.33146Z"></path>
                </svg>
                <span className="new">new</span>
              </div>
            </div>
            <div className="nick-name">
              <span>@{currentUser.username}</span>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.3628 2.30102L13.6796 0.618553C12.8553 -0.205791 11.521 -0.205916 10.6965 0.618522L0.778434 10.4718L0.0102775 15.1279C-0.0733163 15.6346 0.365528 16.0736 0.872371 15.99L5.52846 15.2218L15.3824 5.30374C16.2052 4.4809 16.2131 3.15127 15.3628 2.30102ZM6.26384 9.7364C6.39809 9.87065 6.57406 9.93774 6.75 9.93774C6.92593 9.93774 7.1019 9.87065 7.23615 9.7364L10.9558 6.01671L11.8486 6.90949L6.5625 12.2301V10.9377H5.0625V9.43774H3.77012L9.09072 4.15165L9.9835 5.04443L6.26381 8.76408C5.9954 9.03258 5.9954 9.4679 6.26384 9.7364ZM2.56662 14.3169L1.6834 13.4336L2.06278 11.1341L2.63778 10.5627H3.9375V12.0627H5.4375V13.3624L4.86618 13.9375L2.56662 14.3169ZM14.4099 4.33146L14.4083 4.33305L14.4067 4.33465L12.9058 5.8454L10.1548 3.09446L11.6656 1.59352L11.6672 1.59196L11.6687 1.5904C11.9546 1.30458 12.418 1.30105 12.7073 1.59037L14.3903 3.2733C14.699 3.58196 14.7009 4.04046 14.4099 4.33146Z"></path>
            </svg>
            <div className="preview">
              <button>Preview Fiverr Profile</button>
            </div>
            <div className="other-info">
              <div className="location">
                <div className="country">
                  <div className="left-country">
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 8C9.20938 8 11 6.20937 11 4C11 1.79063 9.20938 0 7 0C4.79063 0 3 1.79063 3 4C3 6.20937 4.79063 8 7 8ZM9.8 9H9.27812C8.58437 9.31875 7.8125 9.5 7 9.5C6.1875 9.5 5.41875 9.31875 4.72188 9H4.2C1.88125 9 0 10.8813 0 13.2V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V13.2C14 10.8813 12.1187 9 9.8 9Z"></path>
                    </svg>
                    <span>Member since</span>
                  </div>
                  <div className="right-country">
                    <span>
                      {moment(currentUser.createdAt).format("DD-MM-YYYY")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="location">
                <div className="country">
                  <div className="left-country">
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 12 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0)">
                        <path d="M5.38338 15.6772C0.842813 9.09472 0 8.41916 0 6C0 2.68628 2.68628 0 6 0C9.31372 0 12 2.68628 12 6C12 8.41916 11.1572 9.09472 6.61662 15.6772C6.31866 16.1076 5.68131 16.1076 5.38338 15.6772ZM6 8.5C7.38072 8.5 8.5 7.38072 8.5 6C8.5 4.61928 7.38072 3.5 6 3.5C4.61928 3.5 3.5 4.61928 3.5 6C3.5 7.38072 4.61928 8.5 6 8.5Z"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="12" height="16"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    <span>From</span>
                  </div>
                  <div className="right-country">
                    <span>{currentUser?.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="edit-profile">
            <div className="wrap-edit">
              <div className="edit">
                <span className="title">Description</span>
                <span onClick={() => openFristBox(true)} className="action">
                  Edit Description
                </span>
              </div>
              {fristBox ? (
                <form noValidate className="form-wrapper">
                  <textarea
                    defaultValue={currentUser.desc}
                    maxlength="600"
                    ref={desc}
                    minlength="150"
                    name="[seller_profile][overview]"
                    placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                  ></textarea>
                  <div className="buttons">
                    <button
                      type="button"
                      className="close"
                      onClick={() => openFristBox(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updateDescUser.mutate()}
                      type="button"
                      className="update"
                    >
                      Update
                    </button>
                  </div>
                </form>
              ) : (
                <p className="myself-desc"> {currentUser?.desc}</p>
              )}
            </div>
            <AddLans />
            <AddSkill openThirBox={openThirBox} thirBox={thirBox} />
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default Profile;
