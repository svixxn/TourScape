/* eslint-disable react/prop-types */
import { toast } from "react-toastify";

const Toast = ({ type, message, duration }) => {
  const showToast = () => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "bottom-center",
          autoClose: duration,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case "error":
        toast.error(message, {
          position: "bottom-center",
          autoClose: duration,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case "warning":
        toast.warning(message, {
          position: "bottom-center",
          autoClose: duration,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      default:
        toast(message, {
          position: "bottom-center",
          autoClose: duration,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
    }
  };

  showToast();

  return null; 
};

export default Toast;
