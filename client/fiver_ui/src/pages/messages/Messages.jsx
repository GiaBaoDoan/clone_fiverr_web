import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Messages.scss";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

function Messages() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, conversationLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
  });
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const message =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit delenit  repellat reprehenderit natus unde velit delectus quas eaque, voluptatesillum commodi tempora dolor id assumenda sint officia. Ex, in deleniti!";

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  return (
    <div className="messages">
      <div className="container">
        <table>
          <tr>
            <th>To {currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {data?.map((item) => {
            return (
              <tr
                className={`${
                  ((currentUser.isSeller && !item.readBySeller) ||
                    (!currentUser.isSeller && !item.readByBuyer)) &&
                  "active"
                }`}
              >
                <td>{currentUser.isSeller ? item.buyerId : item.sellerId}</td>
                <td>
                  <Link to={`/message/${item.id}`}>
                    {item?.lastMessage ? (
                      item?.lastMessage.slice(0, 100) + "..."
                    ) : (
                      <span>Start your coversation</span>
                    )}
                  </Link>
                </td>
                <td>{moment(item.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !item.readBySeller) ||
                    (!currentUser.isSeller && !item.readByBuyer)) && (
                    <button onClick={() => mutation.mutate(item.id)}>
                      Mark as read
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Messages;
