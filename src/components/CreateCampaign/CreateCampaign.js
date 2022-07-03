import "./CreateCampaign.scss";

import React from "react";

const CreateCampaign = () => {
  return (
    <div class="row">
      <h1 class="text-center">Create New Campaign</h1>
      <div class="col-md-6 offset-md-3">
        <form
          action="/campaigns"
          method="POST"
          novalidate
          class="validated-form"
          enctype="multipart/form-data"
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
              name="campground[issue]"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          {/* <div class="mb-3">
                <label class="form-label" for="image">Image Url</label>
                <input class="form-control" type="text" id="image" name="campground[image]" required>
                <div class="valid-feedback"> 
                    Looks good!
                </div>
            </div> */}

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
