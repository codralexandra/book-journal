import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home from "./home";

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

test("updates email input value on change", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const emailInput = screen.getByPlaceholderText(
    "example_username / example@mail.com"
  );
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput.value).toBe("test@example.com");
});

test("render password error", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText(
    "example_username / example@mail.com"
  );

  fireEvent.change(emailInput, { target: { value: "test" } });

  const loginButton = screen.getByRole("button", { name: /log in/i });
  fireEvent.click(loginButton);

  await waitFor(() => {
    const passwordError = screen.getByText("Please enter a password");
    expect(passwordError).toBeInTheDocument();
  });
});
