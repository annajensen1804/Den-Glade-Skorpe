import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

/* Hele projektet: #root --> .app --> .main --> <Outlet />
   <Outlet /> renderer alle vores Route-elementer (defineret i Routes.jsx).
   <ScrollRestoration /> sørger for, at siderne starter øverst ved navigation.
   <ToastContainer /> er 'beholderen' til de toast-beskeder, vi viser med toast(). */
const AppLayout = () => {
  return (
    <div className='app'>
      <Navigation />
      <div className='main'>
        <Outlet />
        <ScrollRestoration />
      </div>
      <Footer />
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme='light'
      />
    </div>
  );
};

export default AppLayout;
