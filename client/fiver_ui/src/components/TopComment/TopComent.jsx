import React, { useContext, useEffect, useState } from "react";
import "./TopComment.scss";

import moment from "moment";
import Slider from "react-slick";
import newRequest from "../../utils/newRequest";
import { Context } from "../../context/Context";

const TopComent = ({ reviews }) => {
  const [user, setUser] = useState([]);
  const settings = {
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const getUserReviews = async () => {
    const user = await Promise.all(
      reviews?.map((item) => {
        return newRequest.get(`/users/${item.userId}`);
      })
    );
    return setUser(user);
  };
  useEffect(() => {
    getUserReviews();
  }, [reviews]);
  const getFlag = (user) => {
    const country = countries?.find((item) => item.name === user?.country);
    return country;
  };
  const { countries } = useContext(Context);
  return (
    <div className="topComment">
      <div className="top-title">
        <h2>What people loved about this seller</h2>
        <span className="see-all">See all reviews</span>
      </div>
      <div className="content">
        <Slider {...settings}>
          {reviews?.map((item, index) => {
            return (
              <div className="comments">
                <div className="left-reviews">
                  {/* <Icon /> */}
                  <img src={user[index]?.data.img} alt="" />
                </div>
                <div className="right-reviews">
                  <div className="right-top">
                    <div className="username">{user[index]?.data.username}</div>
                    <div className="nation">
                      <img
                        className="flag"
                        src={getFlag(user[index]?.data)?.flag}
                        alt=""
                      />
                      <span className="countryName">
                        {getFlag(user[index]?.data)?.name}
                      </span>
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
                      <span className="numStar">{item?.star}</span>
                    </div>
                  </div>
                  <div>
                    <p className="desc">{item.desc.slice(0, 100) + "..."}</p>
                  </div>
                  <span className="time">
                    {moment(item.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TopComent;
