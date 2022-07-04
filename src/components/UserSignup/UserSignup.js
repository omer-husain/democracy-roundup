import "./UserSignup.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MyVerticallyCenteredModal from "../MyVerticallyCenteredModal/MyVerticallyCenteredModal";

import React from "react";

const UserSignup = () => {
  const [redirect, setRedirect] = useState(false);
  const [resApi, setResApi] = useState({
    redirectUrl: "",
    redirectMessage: "",
  });
  let history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post("http://localhost:8080/register", {
        userInfo,
      });
      console.log(response);
      setResApi({
        redirectUrl: response.data.redirectUrl,
        redirectMessage: response.data.redirectMessage,
      });

      setModalShow(true);
      setUserInfo({ username: "", email: "", password: "" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!modalShow && redirect) {
      history.push({
        pathname: resApi.redirectUrl,
        state: { message: resApi.redirectMessage },
      });
    }
  }, [redirect]);

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
          <div className="card shadow">
            <img
              src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
              alt=""
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Sign Up</h5>
              <form
                onSubmit={handleSubmit}
                className="validated-form"
                novalidate
              >
                <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    id="username"
                    name="username"
                    value={userInfo.username}
                    required
                    autofocus
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    value={userInfo.password}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <button className="btn btn-success btn-block">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal
        titleModal={userInfo.username}
        message={`Successfully Created`}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setRedirect(true);
        }}
      />
    </div>
  );
};

export default UserSignup;
