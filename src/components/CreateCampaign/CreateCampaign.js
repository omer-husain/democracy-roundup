import "./CreateCampaign.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import React from "react";

const CreateCampaign = () => {
  const [redirect, setRedirect] = useState(false);
  const [resApi, setResApi] = useState({
    redirectUrl: "",
    redirectMessage: "",
  });
  let history = useHistory();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios.post(
        "http://localhost:8080/login",
        {
          username: userInfo.username,
          password: userInfo.password,
        },
        config
      );
      console.log(response);

      setResApi({
        redirectUrl: response.data.redirectUrl,
        redirectMessage: response.data.redirectMessage,
      });

      setUserInfo({ username: "", password: "" });
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="row">
      <h1 class="text-center">Create New Campaign</h1>
      <div class="col-md-6 offset-md-3">
        <form
          action="http://localhost:8080/campaigns"
          method="POST"
          novalidate
          class="validated-form"
        >
          <div class="mb-3">
            <label class="form-label" for="title">
              Title
            </label>
            <input
              class="form-control"
              type="text"
              id="title"
              name="campaign[title]"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="description">
              Description
            </label>
            <textarea
              class="form-control"
              type="text"
              id="description"
              name="campaign[description]"
              required
            ></textarea>
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="issue">
              Issue
            </label>
            <input
              class="form-control"
              type="text"
              id="location"
              name="campaign[issue]"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="mb-3">
            <button class="btn btn-success">Create Campaign</button>
          </div>
        </form>
        <a href="/campaigns">Back to All Campaigns</a>
      </div>
    </div>
  );
};

export default CreateCampaign;
