import "./CreateCampaign.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TableDatePicker from "../TableDatePicker/TableDatePicker";

import React from "react";

const CreateCampaign = () => {
  const [dateData, setDateData] = useState();
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

  const transferDateFromCalender = (calenderDate) => {
    setDateData(calenderDate);
  };

  useEffect(() => {
    console.log(dateData);
  }, [dateData]);

  return (
    <div className="row createCampaign">
      <h1 className="text-center">Create New Campaign</h1>
      <div className="col-md-6 offset-md-3">
        <form
          action="http://localhost:8080/campaigns"
          method="POST"
          novalidate
          className="validated-form"
        >
          <div className="mb-3">
            <label className="form-label" for="title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="campaign[title]"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" for="description">
              Description
            </label>
            <textarea
              className="form-control"
              type="text"
              id="description"
              name="campaign[description]"
              required
            ></textarea>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" for="issue">
              Issue
            </label>
            <input
              className="form-control"
              type="text"
              id="location"
              name="campaign[issue]"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" for="date">
              When does campaign end
            </label>
            <TableDatePicker
              transferDateFromCalender={transferDateFromCalender}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <button className="btn btn-success">Create Campaign</button>
          </div>
        </form>

        <a href="/campaigns">Back to All Campaigns</a>
      </div>
    </div>
  );
};

export default CreateCampaign;
