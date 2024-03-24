import React, { useEffect, useState } from "react";
import "./Conversation.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";
import axios from "axios";
import Loading from "../Loading/Loading";
const Conversation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  const { id } = useParams();
  const [active, setActive] = useState(
    id.split(currentUser._id)[0] || id.split(currentUser._id)[1]
  );
  const [search, setSearch] = useState(false);
  const [option, setOption] = useState();
  const [data, setData] = useState([]);
  const {
    data: conversation,
    refetch: fetchALlConversation,
    isLoading,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest
        .get(`/conversations${option?.length > 0 ? `?sort=${option}` : ""}`)
        .then((res) => res.data),
  });
  const [sort, sortMessage] = useState(false);
  const onChange = (e) => {
    const value = e.target.value;
    if (value.length) {
      const newData = data.filter((item) =>
        item.data.username.includes(value.toLowerCase())
      );
      setData(newData);
    } else {
      getUser();
    }
  };
  const mutationConversation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });
  const markRead = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/makeRead/${id}`);
    },
    onSuccess: () => {
      fetchALlConversation();
      queryClient.invalidateQueries(["conversations"]);
    },
  });
  const ratingStar = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/ratingStar/${id}`);
    },
    onSuccess: () => {
      fetchALlConversation();
      queryClient.invalidateQueries(["conversations"]);
    },
  });
  const getUser = async () => {
    const users = await Promise?.all(
      conversation?.map((item) => {
        const res = axios.get(
          `http://localhost:8080/api/users/${
            !currentUser?.isSeller ? item?.sellerId : item?.buyerId
          }`
        );
        return res;
      })
    );
    return setData(users);
  };
  useEffect(() => {
    getUser();
    setActive(id.split(currentUser._id)[0] || id.split(currentUser._id)[1]);
  }, [conversation, id]);
  return (
    <div className="left-section">
      <div className="filter-message">
        <div className="header-filter">
          {search ? (
            <span className="filter">
              <span onClick={() => sortMessage(!sort)} className="All-message">
                {!option?.length ? "All message" : "Unread"}
                {sort && (
                  <div className="list-sort">
                    <p
                      onClick={() => {
                        setOption();
                        fetchALlConversation();
                      }}
                    >
                      <span>
                        <svg
                          style={{
                            opacity: `${option !== "Unread" ? "1" : "0"}`,
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-check"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>{" "}
                      All Messages
                    </p>
                    <p
                      onClick={() => {
                        setOption("Unread");
                        fetchALlConversation();
                      }}
                    >
                      <span
                        style={{
                          opacity: `${option === "Unread" ? "1" : "0"}`,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-check"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>{" "}
                      Unread
                    </p>
                  </div>
                )}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          ) : (
            <div>
              <input
                onChange={onChange}
                placeholder="Filter the name"
                type="text"
              />
            </div>
          )}
          <span onClick={() => setSearch(!search)}>
            {!search ? (
              <p
                style={{
                  fontWeight: "600",
                  color: "#000000",
                  textDecoration: "underline",
                }}
              >
                Close
              </p>
            ) : (
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
                class="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            )}
          </span>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="list-message">
            {data?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="wrap-userItem"
                  style={{
                    backgroundColor: `${
                      active === conversation[index]?.sellerId ||
                      active === conversation[index]?.buyerId
                        ? "rgba(0,0,0,0.04)"
                        : ""
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    onClick={() => {
                      navigate(`/message/${conversation[index].id}`);
                      mutationConversation.mutate(conversation[index].id);
                      setActive(
                        currentUser?.isSeller
                          ? conversation[index].buyerId
                          : conversation[index].sellerId
                      );
                    }}
                    className="user-item active"
                  >
                    <div className="user-online">
                      <img src={item.data.img} alt="" />
                      <div className="dot"></div>
                    </div>
                    <div className="user-info">
                      <div className="top">
                        <span className="user-name">{item.data.username}</span>
                      </div>
                      <div className="bottom">
                        <span
                          className="mess"
                          style={{
                            fontWeight: `${
                              (currentUser.isSeller &&
                                !conversation[index]?.readBySeller) ||
                              (!currentUser.isSeller &&
                                !conversation[index]?.readByBuyer)
                                ? "600"
                                : "400"
                            }`,
                            color: "#000000",
                          }}
                        >
                          {conversation[index]?.userId === currentUser._id
                            ? "Me: "
                            : ""}
                          {conversation[index]?.lastMessage?.length > 20
                            ? conversation[index]?.lastMessage.substring(
                                0,
                                10
                              ) + "..."
                            : conversation[index]?.lastMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "12px",
                      alignItems: "flex-end",
                    }}
                  >
                    <span className="updatedAt">
                      {moment(conversation[index]?.updatedAt)
                        .fromNow()
                        .replace("ago", "")
                        .replace("a few seconds", "just now")}
                    </span>
                    <span style={{ display: "flex", gap: "10px" }}>
                      {currentUser?.isSeller ? (
                        conversation[index]?.readBySeller ? (
                          <svg
                            onClick={() =>
                              markRead.mutate(conversation[index].id)
                            }
                            className="readMessage"
                            width="18"
                            height="18"
                            strokeWidth={1}
                            fill="#62646a"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.688.07h.622a.727.727 0 0 0-.622 0ZM16 6.544v-1.95c0-.58-.382-1-.781-1.237a8.456 8.456 0 0 0-.427-.216c-.208-.1-.489-.236-.817-.392-.656-.314-1.504-.716-2.343-1.113L9.342.556 8.31.068 7.688.07 6.657.56l-2.29 1.086A691.745 691.745 0 0 0 .824 3.333C.355 3.572 0 4.042 0 4.594v9.709C0 15.24.76 16 1.697 16h12.606C15.24 16 16 15.24 16 14.303V6.545Zm-1.454-.435V4.658a.443.443 0 0 0-.071-.051 5.377 5.377 0 0 0-.075-.038l-.244-.12c-.203-.098-.48-.232-.808-.388-.653-.312-1.5-.713-2.338-1.11l-2.289-1.08-.72-.34-.72.343a6968.975 6968.975 0 0 0-5.442 2.585l-.248.119-.076.036-.023.012-.007.003-.002.001a.179.179 0 0 0-.028.018v1.461L8 9.6l6.546-3.49ZM1.455 7.758v6.545c0 .134.108.242.242.242h12.606a.243.243 0 0 0 .242-.242V7.758l-6.203 3.308a.728.728 0 0 1-.684 0L1.455 7.758Z"
                            ></path>
                          </svg>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                borderColor: "rgb(193, 74, 131)",
                                backgroundColor: "rgb(193, 74, 131)",
                                color: "white",
                                padding: "0 8px",
                                fontSize: "12px",
                                fontWeight: 600,
                                borderRadius: "100%",
                              }}
                            >
                              1
                            </span>
                            <svg
                              onClick={() =>
                                markRead.mutate(conversation[index].id)
                              }
                              className="readMessage"
                              width="18"
                              height="18"
                              fill="#62646a"
                              strokeWidth={1}
                              viewBox="0 0 18 16"
                              xmlns="http://www.w3.org/2000/svg"
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
                          </div>
                        )
                      ) : conversation[index]?.readByBuyer ? (
                        <svg
                          onClick={() =>
                            markRead.mutate(conversation[index].id)
                          }
                          className="readMessage"
                          width="18"
                          height="18"
                          strokeWidth="1"
                          fill="#62646a"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.688.07h.622a.727.727 0 0 0-.622 0ZM16 6.544v-1.95c0-.58-.382-1-.781-1.237a8.456 8.456 0 0 0-.427-.216c-.208-.1-.489-.236-.817-.392-.656-.314-1.504-.716-2.343-1.113L9.342.556 8.31.068 7.688.07 6.657.56l-2.29 1.086A691.745 691.745 0 0 0 .824 3.333C.355 3.572 0 4.042 0 4.594v9.709C0 15.24.76 16 1.697 16h12.606C15.24 16 16 15.24 16 14.303V6.545Zm-1.454-.435V4.658a.443.443 0 0 0-.071-.051 5.377 5.377 0 0 0-.075-.038l-.244-.12c-.203-.098-.48-.232-.808-.388-.653-.312-1.5-.713-2.338-1.11l-2.289-1.08-.72-.34-.72.343a6968.975 6968.975 0 0 0-5.442 2.585l-.248.119-.076.036-.023.012-.007.003-.002.001a.179.179 0 0 0-.028.018v1.461L8 9.6l6.546-3.49ZM1.455 7.758v6.545c0 .134.108.242.242.242h12.606a.243.243 0 0 0 .242-.242V7.758l-6.203 3.308a.728.728 0 0 1-.684 0L1.455 7.758Z"
                          ></path>
                        </svg>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              borderColor: "rgb(193, 74, 131)",
                              backgroundColor: "rgb(193, 74, 131)",
                              color: "white",
                              padding: "0 8px",
                              fontSize: "12px",
                              fontWeight: 600,
                              borderRadius: "100%",
                            }}
                          >
                            1
                          </span>
                          <svg
                            onClick={() =>
                              markRead.mutate(conversation[index].id)
                            }
                            className="readMessage"
                            width="18"
                            height="18"
                            strokeWidth={1}
                            fill="#62646a"
                            viewBox="0 0 18 16"
                            xmlns="http://www.w3.org/2000/svg"
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
                        </div>
                      )}
                      {conversation[index]?.ratingStar ? (
                        <svg
                          onClick={() =>
                            ratingStar.mutate(conversation[index].id)
                          }
                          width="18"
                          height="18"
                          viewBox="0 0 16 15"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#FFB33E"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16 5.813c0 .17-.125.33-.25.454l-3.49 3.345.826 4.726c.01.067.01.123.01.19 0 .245-.115.472-.394.472a.792.792 0 0 1-.385-.113L8 12.656l-4.317 2.23a.823.823 0 0 1-.385.114c-.279 0-.404-.227-.404-.473 0-.066.01-.122.02-.189l.826-4.726-3.5-3.345C.125 6.144 0 5.983 0 5.813c0-.284.298-.397.538-.435l4.827-.69L7.53.388C7.615.208 7.779 0 8 0c.221 0 .385.208.471.388l2.164 4.3 4.826.69c.231.038.539.151.539.435Z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          onClick={() =>
                            ratingStar.mutate(conversation[index].id)
                          }
                          width="18"
                          height="18"
                          viewBox="0 0 16 15"
                          className="star"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentFill"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="m10.933 9.187 2.942-2.807-4.058-.586L8 2.184l-1.817 3.61-4.058.586 2.942 2.807-.702 3.98L8 11.284l3.625 1.881-.692-3.979ZM16 5.813c0 .17-.125.33-.25.454l-3.49 3.345.826 4.726c.01.067.01.123.01.19 0 .255-.115.472-.394.472a.792.792 0 0 1-.385-.113L8 12.656l-4.317 2.23a.823.823 0 0 1-.385.114c-.279 0-.404-.227-.404-.473 0-.066.01-.122.02-.189l.826-4.726-3.5-3.345C.125 6.144 0 5.983 0 5.813c0-.284.298-.397.538-.435l4.827-.69L7.53.388C7.615.208 7.779 0 8 0c.221 0 .385.208.471.388l2.164 4.3 4.826.69c.231.038.539.151.539.435Z"
                          ></path>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
