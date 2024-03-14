import React, { useEffect, useRef, useState } from "react";
import "./Message.scss";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Icon from "../../components/icon/Icon";
import moment from "moment";
import Conversation from "../../components/conversations/Conversation";
const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const { id } = useParams();
  const yourId = id.split(`${currentUser?._id}`);
  const desc = useRef();
  const {
    data: messages,
    messageLoading,
    refetch,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });
  const { data: user } = useQuery({
    queryKey: [yourId[0] || yourId[1]],
    queryFn: () =>
      newRequest
        .get(`/users/${yourId[0] || yourId[1]}`)
        .then((res) => res.data),
  });
  const sendMessage = () => {
    const message = {
      conversationId: id,
      userId: currentUser?._id,
      desc: desc.current.value,
    };
    desc.current.value = "";
    mutation.mutate(message);
  };
  const mutation = useMutation({
    mutationFn: (payload) => {
      return newRequest.post("/messages", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["message"]);
    },
  });
  useEffect(() => {
    refetch();
  }, [id]);
  return (
    <div className="message">
      <div className="container">
        <section>
          <Conversation messages={messages} />
          <div className="wrap-message">
            <div className="backToBottom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                color="#000000"
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div className="center-setion">
              <div className="header-message">
                <div className="left">
                  <p className="" style={{ display: "flex" }}>
                    <span className="dot"></span>
                    <span className="username">Juhi Faldu</span> @explorance
                  </p>
                  <p>
                    Last seen: 53 minutes ago | Local time: 08 Mar 2024, 18:45
                  </p>
                </div>
                <div className="right">
                  <svg
                    width="20"
                    height="20"
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
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentFill"
                  >
                    <circle cx="2" cy="2" r="2"></circle>
                    <circle cx="8" cy="2" r="2"></circle>
                    <circle cx="14" cy="2" r="2"></circle>
                  </svg>
                </div>
              </div>
              {messageLoading ? (
                <Loading />
              ) : (
                <div className="messages">
                  <div className="security">
                    <div className="wrap-sec">
                      <div className="top">
                        <div className="line-gray"></div>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="grey_1100"
                        >
                          <path d="m14.578 2.615-6-2.5a1.505 1.505 0 0 0-1.153 0l-6 2.5C.865 2.846.5 3.393.5 4c0 6.204 3.578 10.491 6.922 11.885.369.153.784.153 1.153 0 2.678-1.116 6.925-4.969 6.925-11.885a1.5 1.5 0 0 0-.922-1.384Zm-1.475 3.569-5.75 5.75a.502.502 0 0 1-.706 0l-3.25-3.25a.502.502 0 0 1 0-.706l.706-.707a.502.502 0 0 1 .706 0L7 9.462l4.69-4.69a.502.502 0 0 1 .707 0l.706.706a.496.496 0 0 1 0 .706Z"></path>
                        </svg>
                        <span>We have Your Back</span>
                        <div className="line-gray"></div>
                      </div>
                      <p>
                        For added safety and your protection, keep payments and
                        communications within Fiverr
                      </p>
                    </div>
                  </div>
                  {messages?.map((item, index) => {
                    return (
                      <div className="warp">
                        <div className="item">
                          {item.userId == currentUser?._id ? (
                            currentUser?.img ? (
                              <img src={currentUser?.img} alt="" />
                            ) : (
                              <Icon />
                            )
                          ) : user?.img ? (
                            <img src={user?.img} alt="" />
                          ) : (
                            <Icon />
                          )}
                          <div className="person-send">
                            <div className="time-name">
                              <span className="person-name">
                                {item.userId !== (yourId[1] || yourId[0])
                                  ? "Me"
                                  : user?.username}{" "}
                              </span>
                              <span className="time">
                                {moment(item.updatedAt).format("DD MMMM YYYY")},{" "}
                                {moment(item.updatedAt).format("HH:mm")}
                              </span>
                            </div>
                            <p className="content-mess">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="wrap-send">
                <div className="write">
                  <textarea
                    onResize="none"
                    type="text"
                    ref={desc}
                    placeholder="Send message...."
                  />
                </div>
                <div className="send">
                  <div className="icons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 17 16"
                      fill="#74767E"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.2 1.485a6.515 6.515 0 1 0 0 13.03 6.515 6.515 0 0 0 0-13.03ZM.2 8a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
                      ></path>
                      <path d="M5.231 8a.99.99 0 1 0 0-1.98.99.99 0 0 0 0 1.98ZM11.17 8a.99.99 0 1 0 0-1.98.99.99 0 0 0 0 1.98Z"></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.22 9.237c.41 0 .743.332.743.742a1.237 1.237 0 0 0 2.474 0 .742.742 0 0 1 1.485 0 2.722 2.722 0 1 1-5.443 0c0-.41.332-.742.742-.742Z"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 10 16"
                      fill="#74767E"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.689 1.485A2.208 2.208 0 0 0 1.475 3.71v7.258A3.527 3.527 0 0 0 5 14.515a3.527 3.527 0 0 0 3.525-3.546V2.722c0-.41.33-.743.737-.743a.74.74 0 0 1 .738.743v8.247C10 13.754 7.768 16 5 16s-5-2.246-5-5.03V3.71A3.688 3.688 0 0 1 3.689 0a3.688 3.688 0 0 1 3.688 3.711v6.598A2.368 2.368 0 0 1 5 12.701a2.368 2.368 0 0 1-2.377-2.392V4.701c0-.41.33-.742.738-.742a.74.74 0 0 1 .737.742v5.608c0 .514.391.908.902.908.51 0 .902-.394.902-.908V3.711c0-1.24-.982-2.226-2.213-2.226Z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <span
                      className="send-message"
                      onClick={() => sendMessage()}
                    >
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
                      </svg>{" "}
                      Send
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-section"></div>
        </section>
      </div>
    </div>
  );
};

export default Message;
