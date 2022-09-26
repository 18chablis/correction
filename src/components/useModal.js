import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearMessage } from "../actions/error.action";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch();
  function toggle() {
    setIsShowing(!isShowing);
    dispatch(clearMessage());
  }

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
