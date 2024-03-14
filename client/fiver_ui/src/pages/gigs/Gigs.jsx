import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import { GigCard } from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
const Gigs = () => {
  const [sortType, setSort] = useState("createdAt");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
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
  }, [sortType]);
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr Graphics & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <label htmlFor="">Sort by cat: </label>
            <select name="" id="">
              <option value="music">music</option>
              <option value="web">web</option>
              <option value="ai">AI</option>
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
          <p className="loading">Loadding...</p>
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
