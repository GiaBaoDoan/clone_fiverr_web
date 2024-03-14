import React, { useEffect, useState } from "react";
import "./Review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";
import AddReviews from "../addReview/AddReviews";
import { useRef } from "react";
const Reviews = ({ gigId, owner }) => {
  const currentUser = getCurrentUser();
  const commentRef = useRef(null);
  const handleEditComment = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [editCmt, setEdit] = useState({
    userId: "",
    edit: false,
  });
  const { data: reviews, reviewLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
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
            <div style={{ opacity: `${count ? "1" : "0.3"}` }} className="wrap">
              <p className="total-star">{item} Stars</p>
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
              <span>({count})</span>
            </div>
          );
        })}
      </div>
      {reviewLoading ? (
        <p>Loading...</p>
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
      <div ref={commentRef}>
        {(editCmt.edit || !user) && (
          <AddReviews editCmt={editCmt} setEdit={setEdit} gigId={gigId} />
        )}
      </div>
    </div>
  );
};

export default Reviews;
