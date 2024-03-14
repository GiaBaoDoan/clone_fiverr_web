import React, { useState } from "react";
import "./Gig.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/Reviews/Reviews";
import Icon from "../../components/icon/Icon";
import { getCurrentUser } from "../../components/getCurrentUser/getCurrentUser";
const Gig = () => {
  const navigate = useNavigate();
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [popup, setPopup] = useState(false);
  const [options, setOptions] = useState("Basic");
  const [slideIndex, setSlideIndex] = useState(null);
  const { id } = useParams();
  const { data: gig, gigLoading } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/singleGig/${id}`).then((res) => res.data),
  });
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: [gig?.userId],
    queryFn: () =>
      newRequest.get(`/users/${gig?.userId}`).then((res) => res.data),
  });
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => newRequest.get(`/reviews/${id}`).then((res) => res.data),
  });
  const fiverStarCount = () => {
    const count = reviews?.filter((x) => x.star === 5);
    return count?.length;
  };
  const handelPrice = (price) => {
    let newPrice = null;
    if (options === "Standar") {
      newPrice = price * 0.2 + price;
    } else if (options == "Vip") {
      newPrice = price * 0.5 + price;
    } else {
      newPrice = price;
    }
    return newPrice;
  };
  return (
    <div className="gig-page">
      {popup && (
        <div className="popup">
          <div className="close-image" onClick={() => setPopup(false)}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              width={24}
              height={24}
              stroke="currentColor"
              strokeWidth={2}
              className="close"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="show-full">
            <img src={gig?.images[slideIndex]} alt="" />
          </div>
          <div className="arrows">
            <svg
              onClick={() =>
                slideIndex === 0
                  ? setSlideIndex(gig?.images.length - 1)
                  : setSlideIndex(slideIndex - 1)
              }
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="left-arrow"
              width={22}
              strokeWidth="2"
              height={22}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>

            <svg
              onClick={() =>
                slideIndex === gig?.images.length - 1
                  ? setSlideIndex(0)
                  : setSlideIndex(slideIndex + 1)
              }
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="right-arrow"
              width={22}
              height={22}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="gig">
        {gigLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="container">
            <div className="left">
              <span className="breadcrumbs">Liverr Graphics & Design </span>
              <h1>{gig?.title}</h1>
              <div className="user">
                {user?.img ? <img src={user?.img} alt="" /> : <Icon />}
                <div className="user-right">
                  <span className="username">{user?.username}</span>
                  <div>
                    {!isNaN(gig?.totalStars / gig?.starNumber) && (
                      <div className="stars">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          color="#404145"
                          fill="#404145"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>
                          <span
                            style={{ fontWeight: "600", marginRight: "5px" }}
                          >
                            5.0
                          </span>
                          (<a href="#">{fiverStarCount()}</a>)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Slider {...settings}>
                {gig?.images?.map((i, index) => {
                  return (
                    <div className="wrap-img">
                      <div
                        className="wrap-fullScreen"
                        onClick={() => {
                          setPopup(true);
                          setSlideIndex(index);
                        }}
                      >
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
                          class="lucide lucide-maximize"
                        >
                          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                        </svg>
                        <span>Full Screen</span>
                      </div>
                      <img src={i} alt="" />
                    </div>
                  );
                })}
              </Slider>
              <div className="gig-desc">
                <h2>About This Gig</h2>
                <p>{gig?.desc}</p>
              </div>
              {userLoading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <div className="seller">
                    <h2>About The Seller</h2>
                    <div className="user">
                      {user?.img ? <img src={user?.img} alt="" /> : <Icon />}
                      <div className="info">
                        <span className="username">{user?.username}</span>
                        <span>Logo and Branding Expert</span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="#404145"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-star"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span className="pointStar">5.0</span>
                          <span className="numStar">(5)</span>
                        </div>
                      </div>
                    </div>
                    <button className="contact">Contact Me</button>
                  </div>
                  <div className="box">
                    <div className="items">
                      <div className="item">
                        <span className="title">From</span>
                        <span className="info-specify">{user?.country}</span>
                      </div>
                      <div className="item">
                        <span className="title">Member since</span>
                        <span className="info-specify">Aug 2022</span>
                      </div>
                      <div className="item">
                        <span className="title">Avg. response time</span>
                        <span className="info-specify">4 hours</span>
                      </div>
                      <div className="item">
                        <span className="title">Last delivery</span>
                        <span className="info-specify">1 day</span>
                      </div>
                      <div className="item">
                        <span className="title">Languages</span>
                        <span className="info-specify">English</span>
                      </div>
                    </div>
                    <hr />
                    <p className="desc-mySeflt">{user?.desc}</p>
                  </div>
                </div>
              )}
              <Reviews owner={user} gigId={id} />
            </div>
            <div className="right-content">
              <div className="wrap">
                <div className="Tabs">
                  {["Basic", "Standar", "Vip"].map((item, index) => {
                    return (
                      <div
                        onClick={() => setOptions(item)}
                        className={`Tab  ${item == options ? "active" : ""}`}
                      >
                        <p>{item}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="allRight">
                  <div className="right">
                    <div className="price">
                      <h2 className="price">US${handelPrice(gig?.price)} </h2>
                    </div>
                    <p className="sale">
                      Save up to <b>10%</b> with Subscribe to Save
                    </p>
                    <p className="shortDesc">{gig?.shortDesc}</p>
                    <div className="details">
                      <div className="item">
                        <img src="/img/clock.png" alt="" />
                        <span>{gig?.deliveryTime} Days Delivery</span>
                      </div>
                      <div className="item">
                        <img src="/img/recycle.png" alt="" />
                        <span>{gig?.revisionNumber} Revisions</span>
                      </div>
                    </div>
                    <div className="features">
                      {gig?.features?.map((item) => {
                        return (
                          <div className="item">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 11 9"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentFill"
                            >
                              <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                            </svg>
                            <span>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                    <Link to={`/pay/${id}`}>
                      <button
                        disabled={!getCurrentUser()}
                        style={{
                          backgroundColor: `${
                            !getCurrentUser() ? "lightGray" : ""
                          }`,
                          cursor: `${!getCurrentUser() ? "no-drop" : ""}`,
                        }}
                      >
                        <span>Countinue</span>
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
                          class="lucide lucide-move-right"
                        >
                          <path d="M18 8L22 12L18 16" />
                          <path d="M2 12H22" />
                        </svg>
                      </button>
                    </Link>
                    <span>Compare package</span>
                  </div>
                  <div className="bottom-right">
                    <button>Contact me </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="message" onClick={() => navigate("/messages")}>
        <div className="content">
          <div className="img">
            <img src={user?.img} alt="" />
            <div className="dot"></div>
          </div>
          <div className="bottom">
            <p>
              Message <span>{user?.username}</span>
            </p>
            <p>
              Away . AVG response time : <span>2hrs</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gig;
