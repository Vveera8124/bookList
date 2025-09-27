import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearToast } from "../slice/bookSlice";

const ToastHandler = () => {
  const dispatch = useDispatch();
  const toastState = useSelector((state) => state.books.toast);

  useEffect(() => {
    if (toastState) {
      if (toastState.type === "success") toast.success(toastState.message);
      if (toastState.type === "error") toast.error(toastState.message);
      dispatch(clearToast());
    }
  }, [toastState, dispatch]);

  return null;
};

export default ToastHandler;
