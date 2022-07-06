import "./CreateCampaign.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TableDatePicker from "../TableDatePicker/TableDatePicker";
import { Card, Button, Alert } from "react-bootstrap";

import React from "react";

const CreateCampaign = () => {
  const [dateData, setDateData] = useState();
  const [redirect, setRedirect] = useState(false);
  const [resApi, setResApi] = useState({
    redirectUrl: "",
    redirectMessage: "",
  });

  const [reps, setReps] = useState([]);

  // let baseQuery = `https://represent.opennorth.ca/representatives`;
  let federalBody = `house-of-commons`;
  let provincialBody = `ontario-legislature`;
  // let repLastName = "";
  // let lastNameQuery = `?last_name=`;

  // let federalQuery = `${baseQuery}/${federalBody}${lastNameQuery}${repLastName}`;
  // let provincialQuery = `${baseQuery}/${provincialBody}${lastNameQuery}${repLastName}`;

  const options = [
    {
      label: "",
      value: "",
    },
    {
      label: "Jobs - Economy",
      value: "jobs-economy",
      federalRepLastName: "Freeland",
      provincialRepLastName: "Fedeli",
    },
    {
      label: "Healthcare",
      value: "healthcare",
      federalRepLastName: "Duclos",
      provincialRepLastName: "Jones",
    },
    {
      label: "Inflation",
      value: "inflation",
      federalRepLastName: "Freeland",
      provincialRepLastName: "Fedeli",
    },
    {
      label: "Foreign Policy",
      value: "foreign-policy",
      federalRepLastName: "Freeland",
      provincialRepLastName: "Fedeli",
    },
    {
      label: "Environment",
      value: "environment",
      federalRepLastName: "Freeland",
      provincialRepLastName: "Fedeli",
    },
    {
      label: "Freedom of Speech",
      value: "freedom-speech",
      federalRepLastName: "Freeland",
      provincialRepLastName: "Fedeli",
    },
    {
      label: "Housing",
      value: "housing",
      federalRepLastName: "Freeland",
      provincialRepLastName: "Fedeli",
    },
    {
      label: "Debt",
      value: "debt",
      federalRepLastName: "Freeland",
      provincialRepLastName: "Fedeli",
    },
    { label: "Covid", value: "covid" },
    {
      label: "Crime /Safety",
      value: "crime-safety",
      federalRepLastName: "Freeland",
      provincialRepLastName: "Fedeli",
    },
    {
      label: "Transportation",
      value: "transportation",
      federalRepLastName: "Freeland",
      provincialRepLastName: "Fedeli",
    },
  ];

  const fetchRepData = async (repLastName, legislature) => {
    let response = await axios.get(
      `https://represent.opennorth.ca/representatives/${legislature}/?last_name=${repLastName}`
    );
    console.log(response.data.objects);
    setReps(response.data.objects);
  };

  let history = useHistory();

  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    issue: "",
    createDate: "",
    expiryDate: dateData,
    representative: "",
    legislature: "",
    repLastName: "",
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

  useEffect(() => {
    let foundOption = options.find((option) => {
      return option.value === campaign.issue;
    });

    console.log(foundOption);
    if (foundOption) {
      fetchRepData(foundOption.federalRepLastName, federalBody);
    }
  }, [campaign.issue]);

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
      <div className="col">
        <div className="mb-3">
          <Dropdown
            label="Please Select Your Area of Concern"
            options={options}
            value={campaign.issue}
            onChange={handleIssueChange}
          />

          <div className="valid-feedback">Looks good!</div>
        </div>
        {campaign.representative ? (
          <Alert variant={"success"}>
            You have selected {campaign.representative}
          </Alert>
        ) : (
          <Alert variant={"light"}>
            You have not selected a Campaign Recipient Yet
          </Alert>
        )}
        {reps.length > 0 && (
          <>
            <Card className="card" style={{ width: "18rem" }}>
              <Card.Img
                className="card__image"
                variant="top"
                src={reps[0].photo_url}
              />
              <Card.Body>
                <Card.Title>{`${reps[0].elected_office} ${reps[0].name}`}</Card.Title>
                <Card.Link href={`mailto:${reps[0].email}`}>
                  Email: {`${reps[0].email}`}
                </Card.Link>
                <div className="buttonRow">
                  <a href={reps[0].url}>
                    <Button variant="primary">Website</Button>
                  </a>

                  <Button
                    onClick={() => {
                      setCampaign({
                        ...campaign,
                        representative: reps[0].name,
                        legislature: reps[0].representative_set_name,
                        repLastName: reps[0].last_name,
                      });
                    }}
                    variant="success"
                  >
                    Select
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </>
        )}
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
