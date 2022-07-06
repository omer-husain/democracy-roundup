import React from "react";
import { Container, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ login }) => {
  console.log(login);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">Democracy RoundUp</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/campaigns">Current Campaigns</Nav.Link>
            <Nav.Link href="/reps">My Representatives</Nav.Link>
            <Nav.Link href="/new">Create Your Campaign</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text>
              {login.loggedIn ? (
                <>
                  Signed in as:{" "}
                  <Badge pill bg="primary">
                    {login.username}
                  </Badge>{" "}
                  <Link to="/logout"> Logout </Link>
                </>
              ) : (
                <>
                  <Link to="/login"> Login </Link>
                  <Link to="/signup"> Register </Link>
                </>
              )}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
