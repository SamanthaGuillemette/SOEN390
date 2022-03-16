import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardStats from "./index";

// Unit and integration tests for the dashboard cards.
test("DashboardStats should render without errors", () => {
  render(<DashboardStats/>);

  // Checks text for stat 1
  const stat1 = screen.getByTestId("stat_numOfPatients");
  expect(stat1).toBeInTheDocument();
  expect(stat1).toHaveClass("statItem");

  //Checks text for stat 2
  const stat2 = screen.getByTestId("stat_numOfDoctors");
  expect(stat2).toBeInTheDocument();
  expect(stat2).toHaveClass("statItem");

  // Checks text for stat 3
  const stat3 = screen.getByTestId("stat_numOfActiveCases");
  expect(stat3).toBeInTheDocument();
  expect(stat3).toHaveClass("statItem");

  // Checks text for stat 3
  const stat4 = screen.getByTestId("stat_numOfRecoveredCases");
  expect(stat4).toBeInTheDocument();
  expect(stat4).toHaveClass("statItem");
});

afterEach(() => {
  cleanup();
});
