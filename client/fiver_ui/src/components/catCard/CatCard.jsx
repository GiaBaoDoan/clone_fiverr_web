import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";
import { useNavigate } from "react-router-dom";
const CatCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/gigs?cat=design")} className="catCard">
      <Link to={`/gigs?cat=design`}>
        <img src={item.img} alt="" />
        <div className="info">
          <p className="desc">{item.desc}</p>
          <p className="title">{item.title}</p>
        </div>
      </Link>
    </div>
  );
};

export default CatCard;
