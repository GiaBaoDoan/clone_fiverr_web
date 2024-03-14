import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.scss";
const ProjectCard = ({ item }) => {
  return (
    <Link to={`/gigs/?Project=design`}>
      <div className="card">
        <img
          src={`${item.img}`}
          alt="Social Media Design"
          class="gig-image"
          loading="lazy"
        />
        <div className="info">
          <img className="avatar" src={`${item.img}`} alt="" />
          <div className="">
            <span className="cat">Social Media Design</span>
            <span className="auth">by fernandobengua</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
