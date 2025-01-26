import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Search from "../search-form-component/Search"; // Import Search component
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logoImage from "../../assets/logo.png";
import "./nav.css";

const NavbarComponent = ({ onSearch, setLoading }) => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/home">
          <img
            alt=""
            src={logoImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          ShelfTalk
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="navbar-link" href="/my-books">
              My Books
            </Nav.Link>
            <Nav.Link className="navbar-link" href="">
              About
            </Nav.Link>
            <NavDropdown title="Browse" id="basic-nav-dropdown">
              <NavDropdown.Item className="navbar-dd-item" href="">
                Fantasy
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-dd-item" href="">
                Romance
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-dd-item" href="">
                Sci-fi
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-dd-item" href="">
                Crime
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-dd-item" href="">
                Thriller
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Community" id="basic-nav-dropdown">
              <NavDropdown.Item className="navbar-dd-item" href="/chat">
                Global Chatroom
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {/* Pass setLoading to Search */}
        <Search onSearch={onSearch} setLoading={setLoading} />
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
