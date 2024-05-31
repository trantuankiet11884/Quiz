import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    Swal.fire({
      title: "You Are Not Logged In!",
      text: "Do You Want To Go To The Login Page?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yess",
      cancelButtonText: "Noo",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    });

    return null;
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
