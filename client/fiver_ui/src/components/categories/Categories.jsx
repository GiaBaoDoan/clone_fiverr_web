import React from "react";
import "./Categories.scss";

const Categories = () => {
  return (
    <div className="categoriesNav">
      <div className="container">
        <h2>You need it, we've got it</h2>
        <div className="items">
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                alt=""
              />
              <div className="line"></div>
            </a>

            <p className="title">Graphis & Design</p>
          </div>
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/online-marketing.a3e9794.svg"
                alt="Digital Marketing"
              />
              <div className="line"></div>
            </a>
            <p className="title">Digital Marketing</p>
          </div>
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.a787f2f.svg"
                alt="Writing &amp; Translation"
                loading="lazy"
              />
              <div className="line"></div>
            </a>
            <p className="title">Writing & Translation</p>
          </div>
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.1356999.svg"
                alt="Video &amp; Animation"
                loading="lazy"
              />
              <div className="line"></div>
            </a>
            <p className="title">Writing & Translation</p>
          </div>
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.ede4c90.svg"
                alt="Music &amp; Audio"
                loading="lazy"
              />
              <div className="line"></div>
            </a>
            <p className="title">Writing & Translation</p>
          </div>
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming.6ee5a90.svg"
                alt="Programming &amp; Tech"
                loading="lazy"
              />
              <div className="line"></div>
            </a>
            <p className="title">Writing & Translation</p>
          </div>
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business.fabc3a7.svg"
                alt="Business"
                loading="lazy"
              />
              <div className="line"></div>
            </a>
            <p className="title">Writing & Translation</p>
          </div>
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/lifestyle.112b348.svg"
                alt="Lifestyle"
                loading="lazy"
              />
              <div className="line"></div>
            </a>
            <p className="title">Writing & Translation</p>
          </div>
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/data.855fe95.svg"
                alt="Data"
                loading="lazy"
              />

              <div className="line"></div>
            </a>
            <p className="title">Writing & Translation</p>
          </div>
          <div className="item">
            <a href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/photography.0cf5a3f.svg"
                alt="Photography"
                loading="lazy"
              />
              <div className="line"></div>
            </a>
            <p className="title">Writing & Translation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
