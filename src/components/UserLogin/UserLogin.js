import "./UserLogin.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import canadaImage from "../../images/canada2.jpg";

const UserLogin = ({ isLoggedIn }) => {
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

      isLoggedIn({ loggedIn: true, username: userInfo.username });

      setUserInfo({ username: "", password: "" });
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (redirect) {
      history.push({
        pathname: resApi.redirectUrl,
        state: { message: resApi.redirectMessage, about: "Logged In" },
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
            <img src={canadaImage} alt="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Login</h5>
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
                    value={userInfo.username}
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    autofocus
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
                    value={userInfo.password}
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <button className="btn btn-success btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
