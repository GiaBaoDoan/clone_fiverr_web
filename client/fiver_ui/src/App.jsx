import "./App.css";
import Navbar from "./pages/navbar/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Order from "./pages/oders/Order";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Featured from "./components/featured/Featured";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pay from "./pay/Pay";
import Success from "./pages/success/Success";
import Popup from "./components/Popup/Popup";
import Auth from "./components/auth/Auth";
import Profile from "./pages/profile/Profile";
const queryClient = new QueryClient();
function App() {
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Popup />
          <Auth />
          <Outlet />
          <Footer />
          <ToastContainer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },

        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/orders",
          element: <Order />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/myGigs",
          element: <myGig />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },

        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
