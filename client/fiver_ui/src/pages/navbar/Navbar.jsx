import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../../components/icon/Icon";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Context } from "../../context/Context";
import { getCurrentUser } from "../../components/getCurrentUser/getCurrentUser";
import axios from "axios";
import moment from "moment";
const Navbar = () => {
  const { becomeSeller, openAuth, inbox, openInbox } = useContext(Context);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const currentUser = getCurrentUser();
  const isActive = () => {
    if (window.scrollY == 0) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  const { data: conversation, refetch: fetchALlConversation } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
    enabled: false,
  });
  const getUser = async () => {
    const users = await Promise.all(
      conversation?.map((item) => {
        const res = axios.get(
          `http://localhost:8080/api/users/${
            !currentUser?.isSeller ? item.sellerId : item.buyerId
          }`
        );
        return res;
      })
    );
    return setData(users);
  };
  const mutationConversation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });
  window.addEventListener("scroll", isActive);
  useEffect(() => {
    getUser();
  }, [conversation]);
  const { refetch, isLoading } = useQuery({
    queryKey: ["logout"],
    queryFn: () => {
      newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    },
    enabled: false,
  });
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to={"/"} className="text">
            Fiverr
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="What service are you looking for today ?"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="white"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
        <div className="links">
          <span>Fiverr Bussiness </span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && <span onClick={() => openAuth(true)}>Sign in</span>}
          {!currentUser?.isSeller && (
            <span className="becomeSeller" onClick={() => becomeSeller(true)}>
              Become seller
            </span>
          )}
          {currentUser && (
            <div style={{ display: "flex", gap: "15px" }}>
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#74767e"
                >
                  <path d="M3.494 6.818a6.506 6.506 0 0 1 13.012 0v2.006c0 .504.2.988.557 1.345l1.492 1.492a3.869 3.869 0 0 1 1.133 2.735 2.11 2.11 0 0 1-2.11 2.11H2.422a2.11 2.11 0 0 1-2.11-2.11c0-1.026.408-2.01 1.134-2.735l1.491-1.492c.357-.357.557-.84.557-1.345V6.818Zm-1.307 7.578c0 .13.106.235.235.235h15.156c.13 0 .235-.105.235-.235 0-.529-.21-1.036-.584-1.41l-1.492-1.491a3.778 3.778 0 0 1-1.106-2.671V6.818a4.63 4.63 0 1 0-9.262 0v2.006a3.778 3.778 0 0 1-1.106 2.671L2.77 12.987c-.373.373-.583.88-.583 1.41Zm4.49 4.354c0-.517.419-.937.937-.937h4.772a.938.938 0 0 1 0 1.875H7.614a.937.937 0 0 1-.938-.938Z"></path>
                </svg>
              </span>
              <span
                className="openInbox"
                onClick={() => {
                  fetchALlConversation();
                }}
              >
                <svg
                  onClick={() => openInbox(!inbox)}
                  width="20"
                  height="20"
                  viewBox="0 0 18 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#74767e"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M.838 4.647a.75.75 0 0 1 1.015-.309L9 8.15l7.147-3.812a.75.75 0 0 1 .706 1.324l-7.5 4a.75.75 0 0 1-.706 0l-7.5-4a.75.75 0 0 1-.309-1.015Z"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.5 2.25a.25.25 0 0 0-.25.25v11c0 .138.112.25.25.25h13a.25.25 0 0 0 .25-.25v-11a.25.25 0 0 0-.25-.25h-13ZM.75 2.5c0-.966.784-1.75 1.75-1.75h13c.966 0 1.75.784 1.75 1.75v11a1.75 1.75 0 0 1-1.75 1.75h-13A1.75 1.75 0 0 1 .75 13.5v-11Z"
                  ></path>
                </svg>
                {inbox && (
                  <div className="inbox">
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 18 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="black"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M.838 4.647a.75.75 0 0 1 1.015-.309L9 8.15l7.147-3.812a.75.75 0 0 1 .706 1.324l-7.5 4a.75.75 0 0 1-.706 0l-7.5-4a.75.75 0 0 1-.309-1.015Z"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.5 2.25a.25.25 0 0 0-.25.25v11c0 .138.112.25.25.25h13a.25.25 0 0 0 .25-.25v-11a.25.25 0 0 0-.25-.25h-13ZM.75 2.5c0-.966.784-1.75 1.75-1.75h13c.966 0 1.75.784 1.75 1.75v11a1.75 1.75 0 0 1-1.75 1.75h-13A1.75 1.75 0 0 1 .75 13.5v-11Z"
                        ></path>
                      </svg>
                      <span>Inbox(1)</span>
                    </span>
                    <div
                      className="conversation"
                      style={{
                        backgroundColor: "#f1f0ee",
                        height: "100%",
                        borderRadius: "4px",
                        overflow: "auto",
                      }}
                    >
                      {data?.map((item, index) => {
                        return (
                          <div
                            className="item"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              background: "#fff",
                              padding: "20px",
                              borderBottom: "1px solid #f1f0ee",
                            }}
                          >
                            <div
                              onClick={() => {
                                navigate(`/message/${conversation[index].id}`);
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                }}
                              >
                                <div
                                  className="user-info"
                                  style={{ position: "relative" }}
                                >
                                  <img
                                    style={{ width: "60px", height: "60px" }}
                                    src={item.data.img}
                                    alt=""
                                  />
                                  <span className="dot"></span>
                                </div>
                                <div
                                  className=""
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <p
                                    className=""
                                    style={{
                                      fontWeight: "600",
                                      color: "#212121",
                                    }}
                                  >
                                    {item.data.username}
                                  </p>
                                  <p>
                                    {conversation[index]?.userId ===
                                    currentUser?._id
                                      ? "Me: "
                                      : ""}{" "}
                                    {conversation[index].lastMessage.length > 20
                                      ? conversation[index].lastMessage.slice(
                                          0,
                                          20
                                        ) + "..."
                                      : conversation[index].lastMessage}
                                  </p>
                                  <p
                                    style={{
                                      fontWeight: 500,
                                      color: "#797671",
                                      fontSize: "13px",
                                      padding: "10px 0",
                                    }}
                                  >
                                    {moment(conversation[index].updatedAt)
                                      .fromNow()
                                      .replace("ago", "")}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mail" style={{ padding: "10px" }}>
                              {(currentUser.isSeller &&
                                !conversation[index].readBySeller) ||
                              (!currentUser.isSeller &&
                                !conversation[index].readByBuyer) ? (
                                <svg
                                  onClick={() =>
                                    mutationConversation.mutate(
                                      conversation[index].id
                                    )
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="1.2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-mail"
                                >
                                  <rect
                                    width="20"
                                    height="16"
                                    x="2"
                                    y="4"
                                    rx="2"
                                  />
                                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                              ) : (
                                <svg
                                  onClick={() =>
                                    mutationConversation.mutate(
                                      conversation[index].id
                                    )
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="1.2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-mail-open"
                                >
                                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                                  <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                                </svg>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      style={{
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid #f1f0ee",
                      }}
                    >
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-settings"
                        >
                          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </p>
                      <p
                        style={{
                          color: "blue",
                          textAlign: "right",
                          fontWeight: 600,
                        }}
                      >
                        See all inbox
                      </p>
                    </div>
                  </div>
                )}
              </span>
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="#74767e"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.325 2.00937C12.5188 0.490623 9.72813 0.718748 8 2.47812C6.27188 0.718748 3.48125 0.487498 1.675 2.00937C-0.674996 3.9875 -0.331246 7.2125 1.34375 8.92187L6.825 14.5062C7.1375 14.825 7.55625 15.0031 8 15.0031C8.44688 15.0031 8.8625 14.8281 9.175 14.5094L14.6563 8.925C16.3281 7.21562 16.6781 3.99062 14.325 2.00937ZM13.5875 7.86875L8.10625 13.4531C8.03125 13.5281 7.96875 13.5281 7.89375 13.4531L2.4125 7.86875C1.27188 6.70625 1.04063 4.50625 2.64063 3.15937C3.85625 2.1375 5.73125 2.29062 6.90625 3.4875L8 4.60312L9.09375 3.4875C10.275 2.28437 12.15 2.1375 13.3594 3.15625C14.9563 4.50312 14.7188 6.71562 13.5875 7.86875Z"></path>
                </svg>
              </span>
            </div>
          )}

          {/* {currentUser?.isSeller && <button className="Join">Join</button>} */}
          {currentUser && (
            <div
              className="user"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(!open)}
            >
              {currentUser?.img ? (
                <div className="list">
                  <img src={currentUser?.img} alt="" />
                  <div className="white-dot">
                    <div className="dot"></div>
                  </div>
                </div>
              ) : (
                <Icon />
              )}
              {open && (
                <div className="options">
                  <>
                    <Link to={"/profile/"}>Profile</Link>
                    <Link to={"/gigs"}>Gigs</Link>
                    <Link to={"/add"}>Add new Gig</Link>
                  </>
                  <Link to={"/orders"}>Orders</Link>
                  <Link to={"/messages"}>Messages</Link>

                  <a onClick={() => refetch()}>Logout</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && <div className="line"></div>}
      {(active || pathname !== "/") && (
        <div>
          <div className="menu">
            <Link className="link menuLink" to="/design">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
        </div>
      )}
      {(active || pathname !== "/") && <div className="line"></div>}
    </div>
  );
};

export default Navbar;
