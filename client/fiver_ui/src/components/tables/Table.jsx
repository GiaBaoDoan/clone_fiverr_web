import React from "react";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const Table = ({ item, isSeller }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { data: Buyer } = useQuery({
    queryKey: [item._id],
    queryFn: () =>
      newRequest
        .get(`users/${isSeller ? item.buyerId : item.sellerId}`)
        .then((res) => res.data),
  });

  const handelOrder = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <tr>
      <td>
        <img className="image" src={item.img} alt="" />
      </td>
      <td>{item.title}</td>
      <td>{item.price}</td>
      <td>{Buyer?.username}</td>
      <td>
        <span onClick={() => handelOrder(item)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            color="white"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-mail"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </span>
      </td>
    </tr>
  );
};

export default Table;
