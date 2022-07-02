import React from "react";
import CampaignCard from "../CampaignCard/CampaignCard";

const CampaignList = ({campaigns}) => {
  return (
    
    <>
    {campaigns.map((campaign)=>{
      return <CampaignCard campaign={campaign}></CampaignCard>
    })}
      
    </>
  );
};

export default CampaignList;
