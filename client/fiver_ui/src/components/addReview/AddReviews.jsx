import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import "./AddReview.scss";
import newRequest from "../../utils/newRequest";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";
import { toast } from "react-toastify";

const AddReviews = ({ gigId, editCmt, setEdit }) => {
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  const postComment = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews/createReview", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });
  const updateComment = useMutation({
    mutationFn: (review) => {
      return newRequest.post(
        `/reviews/update/${gigId}/${editCmt.userId}`,
        review
      );
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["reviews"]);
      setEdit({
        edit: false,
        userId: "",
      });
      toast.success(res.data);
    },
    onError: (err) => {
      toast.error(err.response.data);
      setEdit({
        edit: false,
        userId: "",
      });
    },
  });
  const handleSubmit = (e) => {
    const desc = e.target[0].value;
    const star = e.target[1].value;
    console.log(desc, star, gigId);
    e.preventDefault();
    if (!currentUser) {
      return toast.error("Please sign in before reviews this product");
    }
    if (editCmt.edit) {
      updateComment.mutate({ desc, star });
    } else {
      postComment.mutate({ desc, gigId, star });
    }
  };

  return (
    <div className="addReview">
      <h2>Add a review</h2>
      <form action="" className="addForm" onSubmit={handleSubmit}>
        <div>
          <textarea type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button>
          {editCmt.edit ? "Update" : "Send"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-send-horizontal"
          >
            <path d="m3 3 3 9-3 9 19-9Z" />
            <path d="M6 12h16" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AddReviews;
