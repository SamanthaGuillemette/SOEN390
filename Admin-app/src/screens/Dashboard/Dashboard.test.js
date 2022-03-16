import { MemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./index";

// Unit and integration tests for the dashboard.

test("should get the dashboard", () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  // Checks text for patientlist
  const plist = screen.getByTestId("patientlist");
  expect(plist).toBeInTheDocument();
  expect(plist).toHaveTextContent(/^Patient's list$/);
  expect(plist).toHaveClass("listTitle");
});

afterEach(() => {
  cleanup();
});
