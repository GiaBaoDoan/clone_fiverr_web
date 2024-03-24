import React, { useEffect, useState } from "react";
import "./OpenLoveList.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";
import { useNavigate } from "react-router-dom";
const OpenLoveList = () => {
  const [loveList, openLoveList] = useState(false);
  const [list, setLoveList] = useState([]);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      newRequest.get(`/users/${currentUser._id}`).then((res) => res.data),
  });
  const getLoveList = async () => {
    const loveList = await Promise.all(
      user?.myLoveList?.map((item, index) => {
        return newRequest.get(`/gigs/singleGig/${item}`);
      })
    );
    return setLoveList(loveList);
  };
  const saveLoveList = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/gigs/loveList/${id}`, {
        userId: currentUser._id,
      });
    },
    onSuccess: (res) => {
      toast.success("updated successFully !!");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      queryClient.invalidateQueries(["gigs"]);
    },
  });
  useEffect(() => {
    getLoveList();
  }, [user]);
  return (
    <span onClick={() => openLoveList(!loveList)} className="item-no">
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="#74767e"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.325 2.00937C12.5188 0.490623 9.72813 0.718748 8 2.47812C6.27188 0.718748 3.48125 0.487498 1.675 2.00937C-0.674996 3.9875 -0.331246 7.2125 1.34375 8.92187L6.825 14.5062C7.1375 14.825 7.55625 15.0031 8 15.0031C8.44688 15.0031 8.8625 14.8281 9.175 14.5094L14.6563 8.925C16.3281 7.21562 16.6781 3.99062 14.325 2.00937ZM13.5875 7.86875L8.10625 13.4531C8.03125 13.5281 7.96875 13.5281 7.89375 13.4531L2.4125 7.86875C1.27188 6.70625 1.04063 4.50625 2.64063 3.15937C3.85625 2.1375 5.73125 2.29062 6.90625 3.4875L8 4.60312L9.09375 3.4875C10.275 2.28437 12.15 2.1375 13.3594 3.15625C14.9563 4.50312 14.7188 6.71562 13.5875 7.86875Z"></path>
      </svg>
      {loveList && (
        <div className="openLoveList">
          <div className="title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="rgba(0,0,0,1)"
              color="rgba(0,0,0,1)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.325 2.00937C12.5188 0.490623 9.72813 0.718748 8 2.47812C6.27188 0.718748 3.48125 0.487498 1.675 2.00937C-0.674996 3.9875 -0.331246 7.2125 1.34375 8.92187L6.825 14.5062C7.1375 14.825 7.55625 15.0031 8 15.0031C8.44688 15.0031 8.8625 14.8281 9.175 14.5094L14.6563 8.925C16.3281 7.21562 16.6781 3.99062 14.325 2.00937ZM13.5875 7.86875L8.10625 13.4531C8.03125 13.5281 7.96875 13.5281 7.89375 13.4531L2.4125 7.86875C1.27188 6.70625 1.04063 4.50625 2.64063 3.15937C3.85625 2.1375 5.73125 2.29062 6.90625 3.4875L8 4.60312L9.09375 3.4875C10.275 2.28437 12.15 2.1375 13.3594 3.15625C14.9563 4.50312 14.7188 6.71562 13.5875 7.86875Z"></path>
            </svg>
            <p className="">Love List ({list.length})</p>
          </div>
          <div className="list-love">
            {list?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="wrap-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "20px",
                    borderBottom: "1px solid rgb(241, 240, 238)",
                  }}
                >
                  <div
                    className="item-love"
                    onClick={() => navigate(`/gig/${item.data._id}`)}
                  >
                    <img src={item.data.cover} alt="" />
                    <div className="infor">
                      <span>
                        {item.data.title.length > 30
                          ? item.data.title.slice(0, 30) + "..."
                          : item.data.title}
                      </span>
                      <span className="price">${item.data.price}</span>
                    </div>
                  </div>
                  <div>
                    <svg
                      onClick={() => saveLoveList.mutate(item.data._id)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      color="lightgray"
                      fill="white"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-circle-x"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </span>
  );
};

export default OpenLoveList;
