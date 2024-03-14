import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Slide.scss";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CatCard from "../catCard/CatCard";
export const Slide = ({ data, children, sildeToShow = 5 }) => {
  return (
    <div className="slide">
      <Swiper
        modules={[Navigation]}
        slidesPerView={sildeToShow}
        navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {children}
      </Swiper>
      <div className="buttons">
        <button className="arrow-left arrow">
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
            class="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button className="arrow-right arrow">
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
            class="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
