import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Search from "../search-form-component/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logoImage from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import "./nav.css";

const NavbarComponent = ({ onSearch, setLoading }) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/home";

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
              <NavDropdown.Item className="navbar-dd-item" href="/genre?genre=Fantasy">
                Fantasy
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-dd-item" href="/genre?genre=Romance">
                Romance
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-dd-item" href="/genre?genre=Sci-fi">
                Sci-fi
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-dd-item" href="/genre?genre=Crime">
                Crime
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-dd-item" href="/genre?genre=Thriller">
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
        {isMainPage && <Search onSearch={onSearch} setLoading={setLoading} />}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
