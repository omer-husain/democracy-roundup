import { Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

function AlertDismissible({ whatHappened, message }) {
  const [show, setShow] = useState(true);

  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>{whatHappened}</Alert.Heading>
        <p>{message}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              setShow(false);
              history.push({ state: {} });
            }}
            variant="outline-success"
          >
            Close me y'all!
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertDismissible;
