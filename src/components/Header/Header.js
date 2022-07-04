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
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
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
                <Link to="/login"> Login </Link>
              )}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
