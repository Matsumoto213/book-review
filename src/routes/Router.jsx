import React from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
export const RouterConfig = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  // const auth = false;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {auth ? (
            <>
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/signin" />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};
