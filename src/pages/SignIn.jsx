import { useState } from "react";
import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import { url } from "../const";


export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignIn = () => {
    // if (validation()) return;
    axios
      .post(`${url}/signin`, { email, password })
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        history("/");
      })
      .catch(() => {
        // setErrorMessage(`サインインに失敗しました。${err}`);
        setErrorMessage(`サインインに失敗しました。`);
      });
      if (auth) return <Navigate replace to="/" />;
  };

  // const validation = () => {
  //   let isError = false;
  //   setEmailError("");
  //   if (!(/.+@.+\..+/.test(email))) {
  //     setEmailError("正しい形式で入力してください");
  //     isError = true;
  //   }
  //   return isError;
  // };

  return (
    <div>
      <main className="signin">
        <h2>サインイン</h2>
        <p data-cy="error-message" className="error-message">{errorMessage}</p>
        <form className="signin-form">
          <label className="email-label">メールアドレス</label>
          <br />
          <input
            data-cy="email"
            className="email-input"
            onChange={handleEmailChange}
          />
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input
            data-cy="password"
            className="password-input"
            onChange={handlePasswordChange}
          />
          <br />
          <button type="button" className="signin-button" onClick={onSignIn}>
            サインイン
          </button>
        </form>
        <Link to="/SignUp">新規作成</Link>
      </main>
    </div>
  );
};
