import React, { useState } from "react";
import "./Review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";
import AddReviews from "../addReview/AddReviews";
import { useRef } from "react";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
const Reviews = ({ owner, gigId }) => {
  const currentUser = getCurrentUser();
  const commentRef = useRef(null);
  const handleEditComment = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const searchInput = useRef();
  const { id } = useParams();
  const [moreReview, seeMore] = useState(2);
  const [editCmt, setEdit] = useState({
    userId: "",
    edit: false,
  });
  const { data: reviews, isLoading: reviewLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => newRequest.get(`/reviews/${id}`).then((res) => res.data),
  });
  const user = reviews?.find((item) => item.userId === currentUser?._id);
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      <div className="total-reviews">
        <p className="">{reviews?.length} reviews for this gig</p>
        {[5, 4, 3, 2, 1].map((item, index) => {
          const count = reviews?.filter((x) => x.star === item).length;
          return (
            <div
              key={index}
              style={{ opacity: `${count > 0 ? "1" : "0.3"}` }}
              className="wrap"
            >
              <p className="total-star">{item} Stars</p>
              {count > 0 ? (
                <div className="line">
                  <div
                    style={{ width: `${(count / reviews?.length) * 100}%` }}
                    className="black"
                  ></div>
                  <div
                    style={{ width: `${(1 - count / reviews?.length) * 100}%` }}
                    className="gray"
                  ></div>
                </div>
              ) : (
                <div className="line">
                  <div style={{ width: `100%` }} className="gray"></div>
                </div>
              )}

              <span>({count})</span>
            </div>
          );
        })}
      </div>
      {reviews?.length > 0 && (
        <div className="search-reviews">
          <input ref={searchInput} type="text" placeholder="Search Reviews" />
          <span
            onClick={() => console.log(searchInput.current.value)}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
        </div>
      )}
      {reviewLoading ? (
        <Loading />
      ) : (
        reviews?.map((item) => {
          return (
            <Review
              commentRef={commentRef}
              handleEditComment={handleEditComment}
              setEdit={setEdit}
              editCmt={editCmt}
              reviews={reviews}
              item={item}
              owner={owner}
            />
          );
        })
      )}
      <div
        onClick={() =>
          seeMore(moreReview === reviews?.length - 1 ? 2 : reviews?.length - 1)
        }
        className="bottom-right"
      >
        {/* <button>
          {moreReview === reviews?.length - 1
            ? "hide reviews"
            : "Show more Reviews"}{" "}
        </button> */}
      </div>

      <div ref={commentRef}>
        {(editCmt.edit || !user) && (
          <AddReviews editCmt={editCmt} gigId={gigId} setEdit={setEdit} />
        )}
      </div>
    </div>
  );
};

export default Reviews;
