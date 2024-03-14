import React, { useContext, useRef, useState } from "react";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Icon from "../../components/icon/Icon";
import { Context } from "../../context/Context";
import "./Review.scss";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";
import { toast } from "react-toastify";
const Review = ({ item, owner, setEdit, editCmt, handleEditComment }) => {
  const { countries } = useContext(Context);
  const [seemore, setSeemore] = useState(false);
  const [reply, setReply] = useState(false);
  const desc = useRef();
  const handelText = () => {
    return setSeemore(!seemore);
  };
  const { id } = useParams();
  const { data: userReview, reviewLoading } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item?.userId}`).then((res) => res.data),
  });
  const queryClient = useQueryClient();
  const deletedMutaion = useMutation({
    mutationFn: (userId) => {
      return newRequest.delete(`/reviews/${id}/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });
  const editComment = (item) => {
    setEdit({
      ...editCmt,
      edit: true,
      userId: item.userId,
    });
    handleEditComment();
  };

  const addLike = useMutation({
    mutationFn: (userId) => {
      return newRequest.post(`/reviews/addLike/${id}/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });
  const dislike = useMutation({
    mutationFn: (userId) => {
      return newRequest.post(`/reviews/dislike/${id}/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });
  const replyComment = useMutation({
    mutationFn: (userId) => {
      return newRequest.post(`/reviews/reply/${id}/${userId}`, {
        desc: desc.current.value,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      setReply(false);
    },
    onError: (err) => {
      toast.error(err.response.data);
      setReply(false);
    },
  });
  const getFlag = () => {
    const country = countries?.find(
      (item) => item.name === userReview?.country
    );
    return country?.flag;
  };
  return (
    <div className="reviews">
      <div className="review">
        {userReview?.img ? (
          <img className="pp" src={`${userReview?.img}`} alt="" />
        ) : (
          <Icon />
        )}
        <div className="userId">
          <div className="info">
            <span className="username">{userReview?.username}</span>
            <div className="country">
              <img src={getFlag()} alt="" />
              <span>{userReview?.country}</span>
            </div>
          </div>
          <div className="star">
            {Array(item?.star)
              .fill()
              ?.map((item, index) => {
                return (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#404145"
                    color="#404145"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                );
              })}
            <span>{item?.star}</span>
            <span
              style={{ borderLeft: "1px solid lightgray", paddingLeft: "10px" }}
            >
              {moment(item.createdAt).fromNow()}
            </span>
          </div>
          <p className="cmt">
            {item.desc.length > 300
              ? !seemore
                ? item.desc.slice(0, 300) + "..."
                : item.desc
              : item.desc}
            <span className="text-desc" onClick={handelText}>
              {item.desc.length > 300 && (seemore ? "See less" : "See more")}
            </span>
          </p>
          <div className="bot">
            <div className="helpful">
              <span className="helpful-text">Helpful?</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => addLike.mutate(item?.userId)}
              >
                <svg
                  width="16"
                  height="16"
                  fill={`${
                    item.likes.includes(getCurrentUser()._id) ? "#1dbf73" : ""
                  }`}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.89 14.75H1C0.59 14.75 0.25 14.41 0.25 14V8C0.25 7.59 0.59 7.25 1 7.25H3.46L6.05 0.72C6.16 0.43 6.44 0.25 6.75 0.25H7.67C8.59 0.25 9.34 0.98 9.34 1.87V5.45H13.17C14 5.45 14.78 5.84 15.27 6.48C15.73 7.1 15.87 7.87 15.66 8.6L14.39 12.93C14.08 13.99 13.06 14.74 11.9 14.74L11.89 14.75ZM4.75 13.25H11.89C12.38 13.25 12.81 12.95 12.94 12.52L14.21 8.19C14.32 7.81 14.16 7.52 14.06 7.39C13.85 7.12 13.53 6.96 13.16 6.96H8.58C8.17 6.96 7.83 6.62 7.83 6.21V1.87C7.83 1.81 7.76 1.75 7.66 1.75H7.25L4.74 8.08V13.25H4.75ZM1.75 13.25H3.25V8.75H1.75V13.25V13.25Z"></path>
                </svg>
                <span
                  style={{
                    color: `${
                      item.likes.includes(getCurrentUser()._id) ? "#1dbf73" : ""
                    } `,
                  }}
                >
                  Yes ({item?.likes.length})
                </span>
              </div>
              <div
                onClick={() => dislike.mutate(item?.userId)}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <svg
                  width="16"
                  height="16"
                  fill={`${
                    item.dislike.includes(getCurrentUser()._id) ? "red" : ""
                  }`}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.25533 14.75H8.33533C7.41533 14.75 6.66533 14.03 6.66533 13.13L6.66533 9.55H2.83533C2.00533 9.55 1.22533 9.16 0.735326 8.52C0.275326 7.9 0.135326 7.13 0.345326 6.4L1.62533 2.06C1.93533 1 2.95533 0.25 4.11533 0.25L15.0053 0.25C15.4153 0.25 15.7553 0.59 15.7553 1V7C15.7553 7.41 15.4153 7.75 15.0053 7.75H12.5453L9.95533 14.28C9.84533 14.57 9.56533 14.75 9.25533 14.75ZM4.11533 1.75C3.62533 1.75 3.19533 2.05 3.06533 2.48L1.79533 6.81C1.68533 7.19 1.84533 7.48 1.94533 7.61C2.15533 7.88 2.47533 8.04 2.84533 8.04H7.42533C7.83533 8.04 8.17533 8.38 8.17533 8.79L8.17533 13.12C8.17533 13.17 8.24533 13.24 8.34533 13.24H8.75533L11.2653 6.91V1.75L4.11533 1.75ZM12.7553 6.25H14.2553V1.75L12.7553 1.75V6.25Z"></path>
                </svg>
                <span
                  style={{
                    color: `${
                      item.dislike.includes(getCurrentUser()._id) ? "red" : ""
                    } `,
                  }}
                >
                  No ({item?.dislike.length})
                </span>
              </div>
              <span style={{ marginLeft: "10px", color: "gray" }}>
                {item.likes.includes(getCurrentUser()._id) &&
                  "You found this review helpful"}
              </span>
            </div>
            <span onClick={() => setReply(!reply)} className="reply">
              <small>Reply</small>
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
                class="lucide lucide-reply"
              >
                <polyline points="9 17 4 12 9 7" />
                <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
              </svg>
            </span>
          </div>
          {reply && (
            <div className="reply-input">
              <div>
                <input ref={desc} type="text" placeholder="Reply the reviwer" />
                <button onClick={() => replyComment.mutate(item?.userId)}>
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
                    class="lucide lucide-send-horizontal"
                  >
                    <path d="m3 3 3 9-3 9 19-9Z" />
                    <path d="M6 12h16" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          {item.replyByOwner && (
            <div className="reply-comment">
              <div className="owner">
                <img src={owner?.img} alt="" />
                <span>Seller's Response</span>
              </div>
              <p>{item?.replyByOwner}</p>
            </div>
          )}
        </div>
        <div className="action">
          <div onClick={() => editComment(item)} className="edit">
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
              class="lucide lucide-pencil"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </div>
          <div
            onClick={() => deletedMutaion.mutate(item.userId)}
            className="trash"
          >
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
              class="lucide lucide-trash-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Review;
