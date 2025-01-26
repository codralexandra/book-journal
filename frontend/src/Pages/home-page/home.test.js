import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import Home from "./home";

jest.mock("axios");

test("renders email input", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const emailInput = screen.getByPlaceholderText(
    "example_username / example@mail.com"
  );
  expect(emailInput).toBeInTheDocument();
});
