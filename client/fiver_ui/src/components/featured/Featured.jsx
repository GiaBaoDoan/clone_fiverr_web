import React, { useEffect, useRef, useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";
import Navbar from "../../pages/navbar/Navbar";
const Featured = () => {
  const navigate = useNavigate();
  const input = useRef();
  const handelSubmit = (e) => {
    e.preventDefault();
    navigate(`/gigs/?search=${input.current.value}`);
  };
  const listBg = [
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/jenny-2x.jpg",
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/colin-2x.jpg",
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/scarlett-2x.jpg",
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616497/christina-2x.jpg",
  ];
  const [bg, setBg] = useState(
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/jenny-2x.jpg"
  );
  useEffect(() => {
    setTimeout(() => {
      let index = listBg.indexOf(bg);
      if (index == listBg.length - 1) {
        setBg(listBg[0]);
      } else {
        setBg(listBg[index + 1]);
      }
    }, 5000);
  });

  return (
    <div className="featured" style={{ backgroundImage: `url(${bg})` }}>
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <form onSubmit={handelSubmit}>
            <img className="search" src="./img/search.png" alt="" />
            <input ref={input} placeholder="Try to build app*" type="text" />
            <button>Search</button>
          </form>
          <div className="categories">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        {/* <div className="right">
          <img src="./img/man.png" alt="" />
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
