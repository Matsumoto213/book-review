import React from 'react';
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import "./Header.css";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    history("/signin");
  };

  return (
    <header className="header">
      <h1>書籍レビューアプリ</h1>
      {auth ? (
        <button onClick={handleSignOut} className="sign-out-button">
          ログアウト
        </button>
      ) : (
        <></>
      )}
    </header>
  );
};
