import React, { useEffect } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Icon from "../icon/Icon";
export const GigCard = ({ item }) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [item.userId || item.sellerId],
    queryFn: () =>
      newRequest
        .get(`users/${item.userId || item.sellerId}`)
        .then((res) => res.data),
  });
  return (
    <Link className="link" to={`/gig/${item._id}`}>
      <div className="gigCard">
        <img src={item.cover || item.img} alt="" />
        <div className="infor">
          <div className="user">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {data?.img ? <img src={data?.img} alt="" /> : <Icon />}
              <span className="username">{data?.username}</span>
            </div>
            <div className="heart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="rgba(0,0,0,0.04)"
                color="rgba(0,0,0,0.6)"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-heart"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
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
            <span>(96)</span>
          </div>
          <div className="deatails">
            <p className="price">From US${item.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
