import React, { useEffect } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Icon from "../icon/Icon";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";
import { toast } from "react-toastify";
export const GigCard = ({ item }) => {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: [item.userId || item.sellerId],
    queryFn: () =>
      newRequest
        .get(`users/${item.userId || item.sellerId}`)
        .then((res) => res.data),
  });

  const saveLoveList = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/gigs/loveList/${id}`, {
        userId: currentUser._id,
      });
    },
    onSuccess: (res) => {
      toast.success("updated successFully !!");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      queryClient.invalidateQueries(["gigs"]);
    },
  });

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/gig/${item._id}`}
      className="wrap-gig"
    >
      <div className="link">
        <div className="gigCard">
          <img src={item.cover || item.img} alt="" />
          <div className="infor">
            <div className="user">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {data?.img ? (
                  <img
                    style={{ width: "40px", height: "40px" }}
                    src={data?.img}
                    alt=""
                  />
                ) : (
                  <Icon />
                )}
                <span className="username">{data?.username}</span>
              </div>
            </div>
            <p className="title">
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </p>
            <div className="star">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#404145"
                color="#404145"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>(3)</span>
            </div>
            <div className="deatails">
              <p className="price">From US${item.price}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="heart"
        onClick={() => {
          saveLoveList.mutate(item._id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          color={`${
            item.loveSave.indexOf(currentUser._id) !== -1
              ? "rgb(255, 58, 58)"
              : "white"
          }`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill={`${
            item.loveSave.indexOf(currentUser._id) !== -1
              ? "rgb(255, 58, 58)"
              : "rgba(0,0,0,0.3)"
          }`}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-heart"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>
    </Link>
  );
};
