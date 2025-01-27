import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/home-page/home";
import Main from "../Pages/main-page/main";
import axios from "axios";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("render time of main page after login", () => {
  it("should render within 1000ms", async () => {
    const mockNavigate = require("react-router-dom").useNavigate;

    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { username: "testuser" },
    });

    const start = performance.now();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Main />} />
        </Routes>
      </MemoryRouter>
    );

    userEvent.type(
      screen.getByPlaceholderText(/example_username \/ example@mail.com/i),
      "alexandra"
    );
    userEvent.type(
      screen.getByPlaceholderText(/examplepassword123/i),
      "test123"
    );

    const loginButton = screen.getByRole("button", { name: /log in/i });
    fireEvent.click(loginButton);

    await screen.findByText(/ShelfTalk/i);
    
    const end = performance.now();

    const renderTime = end - start;

    console.log(`Render time: ${renderTime}ms`);

    expect(renderTime).toBeLessThan(1000);
  });
});
