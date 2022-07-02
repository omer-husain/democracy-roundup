import React from "react";
import CampaignCard from "../CampaignCard/CampaignCard";

const CampaignList = ({ campaigns }) => {
  return (
    <>
      <h1>Campaigns</h1>
      {campaigns.map((campaign) => {
        return <CampaignCard campaign={campaign}></CampaignCard>;
      })}
    </>
  );
};

export default CampaignList;
