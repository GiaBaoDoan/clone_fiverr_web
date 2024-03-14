import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import { getCurrentUser } from "../../components/getCurrentUser/getCurrentUser";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function MyGigs() {
  const currentUser = getCurrentUser();
  const { data, loading } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs/myGig/${currentUser._id}`).then((res) => res.data),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (gigId) => {
      return newRequest.delete(`/gigs/deleteGig/${gigId}`);
    },
    onSuccess: () => {
      toast.success("deleted successfully");
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {data?.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <img className="image" src={`${item.cover}`} alt="" />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td></td>
                <td>
                  <svg
                    onClick={() => mutation.mutate(item._id)}
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default MyGigs;
