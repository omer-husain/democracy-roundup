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

  const options = [
    { label: "", value: "" },
    { label: "Jobs - Economy", value: "jobs-economy" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Inflation", value: "inflation" },
    { label: "Foreign Policy", value: "foreign-policy" },
    { label: "Environment", value: "environment" },
    { label: "Freedom of Speech", value: "freedom-speech" },
    { label: "Housing", value: "housing" },
    { label: "Debt", value: "debt" },
    { label: "Covid", value: "covid" },
    { label: "Crime /Safety", value: "crime-safety" },
    { label: "Transportation", value: "transportation" },
  ];

  // const [value, setValue] = useState("");
  let history = useHistory();

  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    issue: "",
    expiryDate: dateData,
  });

  const handleChange = (event) => {
    setCampaign({ ...campaign, [event.target.name]: event.target.value });
  };

  const handleIssueChange = (event) => {
    setCampaign({ ...campaign, issue: event.target.value });
  };

  // const handleIssueChange = (event) => {
  //   setValue(event.target.value);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setCampaign({ ...campaign, expiryDate: dateData });
    console.log(
      `This is the state of campaign at submission ${JSON.stringify(campaign)}`
    );

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios.post(
        "http://localhost:8080/campaigns",
        { campaign: campaign },
        config
      );

      console.log("the request was successful");
      console.log(response);

      // setResApi({
      //   redirectUrl: response.data.redirectUrl,
      //   redirectMessage: response.data.redirectMessage,
      // });

      setCampaign({
        title: "",
        description: "",
        issue: "",
        expiryDate: dateData,
      });
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
    setCampaign({ ...campaign, expiryDate: dateData });
  }, [dateData]);

  return (
    <div className="row createCampaign">
      <h1 className="text-center">Create New Campaign</h1>
      <div className="col-md-6 offset-md-3">
        <form onSubmit={handleSubmit} novalidate className="validated-form">
          <div className="mb-3">
            <label className="form-label" for="title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              value={campaign.title}
              onChange={handleChange}
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
              name="description"
              value={campaign.description}
              onChange={handleChange}
              required
            ></textarea>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <Dropdown
              label="What do we eat?"
              options={options}
              value={campaign.issue}
              onChange={handleIssueChange}
            />

            {/* <input
              className="form-control"
              type="text"
              id="issue"
              name="issue"
              onChange={handleChange}
              value={campaign.issue}
              required
            /> */}

            <div className="valid-feedback">Looks good!</div>
          </div>
          {campaign.issue && <span>Issue Selected: {campaign.issue}</span>}
          <div className="mb-3">
            <label className="form-label" for="date">
              When does your campaign end
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

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default CreateCampaign;
