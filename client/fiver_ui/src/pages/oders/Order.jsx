import React from "react";
import { Link } from "react-router-dom";
import "./Order.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Table from "../../components/tables/Table";

function Order() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });
  return (
    <div className="order">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
            <th>Action</th>
          </tr>
          {data?.map((item) => {
            return (
              <Table
                key={item._id}
                isSeller={currentUser?.isSeller}
                item={item}
              />
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Order;
