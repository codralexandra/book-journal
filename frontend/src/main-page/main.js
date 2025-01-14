import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./main.css";

import logoImage from "../assets/logo.png";


const Home = () => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#home">
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
            <Nav.Link className="navbar-link" href="">
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
          </Nav>
        </Navbar.Collapse>
        <Form inline >
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Find books..."
              className="search-form"
            />
          </Col>
          <Col xs="auto">
            <Button id="search-button" type="submit"><i class="bi bi-search"></i></Button>
          </Col>
        </Row>
      </Form>
      </Container>
    </Navbar>
  );
};

export default Home;
