import React, { useEffect } from "react";
import "./Recomended.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GigCard } from "../gigCard/GigCard";
import Loading from "../Loading/Loading";
const Recomended = ({ data, recomedLoading }) => {
  const settings = {
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <div className="Recomended">
      <h2>Recommended for you </h2>
      {recomedLoading ? (
        <Loading />
      ) : (
        <div className="wrap-slider" style={{ padding: "30px 0" }}>
          <Slider {...settings}>
            {data?.map((item, index) => {
              return <GigCard key={index} item={item} />;
            })}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Recomended;
