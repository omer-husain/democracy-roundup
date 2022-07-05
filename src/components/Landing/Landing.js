import React from "react";
import "./Landing.scss";

const Landing = () => {
  return (
    <div className="d-flex text-center text-white bg-dark">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        
        <main className="px-3">
          <h1>Democracy RoundUp</h1>
          <p className="lead">
            Welcome to Democracy RoundUp <br />
            Your Portal to Democracy <br />
            Connect with your representatives and fellow citizens.
          </p>
          <a
            href="/campaigns"
            className="btn btn-lg btn-secondary font-weight-bold border-white bg-white"
          >
            Get Involved Campaigns
          </a>
        </main>

        <footer className="mt-auto text-white-50">
          <p>&copy; 2022</p>
        </footer>
      </div>
    </div>
  );
};
export default Landing;
