import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import { GigCard } from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
const Gigs = () => {
  const [sortType, setSort] = useState("createdAt");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs/getAllGig?${search.split("?")[1]}${
            minRef.current.value ? `&min=${minRef.current.value}` : ""
          }${
            maxRef.current.value ? `&max=${maxRef.current.value}` : ""
          }&sort=${sortType}`
        )
        .then((res) => res.data),
  });
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  const apply = () => {
    refetch();
  };
  useEffect(() => {
    refetch();
  }, [sortType, search]);
  return (
    <div className="gigs">
      <div className="container">
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-home"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>/</span>{" "}
          <span className="breadcrumbs">Fiverr Graphics & Design </span>
        </span>
        <h1>
          {search.split("=")[0] === "?search" &&
          search.split("=")[0] === "?search"
            ? decodeURIComponent(`Result for "${search.split("=")[1]}"`)
            : ""}
        </h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <label htmlFor="">Sort by cat: </label>
            <select
              onChange={(e) => navigate(`/gigs/?cat=${e.target.value}`)}
              name=""
              id=""
            >
              <option value="">All</option>
              <option value="music">music</option>
              <option value="web">web</option>
              <option value="AI">AI</option>
              <option value="design">design</option>
              <option value="art">art</option>
            </select>
            <span>Budget</span>
            <input type="number" ref={minRef} placeholder="min" />
            <input type="number" ref={maxRef} placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">{sortType}</span>
            <img onClick={() => setOpen(!open)} src="./img/down.png" alt="" />
            {open && (
              <div className="right-menu">
                <span onClick={() => reSort("price")}>Price</span>
                <span onClick={() => reSort("createdAt")}>Newtest</span>
              </div>
            )}
          </div>
        </div>
        {isLoading ? (
          <p className="loading">
            {" "}
            <Loading />
          </p>
        ) : (
          <div className="cards">
            {data?.map((item, index) => {
              return <GigCard item={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gigs;
