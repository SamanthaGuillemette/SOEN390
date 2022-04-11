import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import PatientProfile from ".";

test("PatientProfile should render without errors", () => {
  render(<PatientProfile />);

  // Avatar card element
  const profileInformation = screen.getByTestId("profile-info");
  expect(profileInformation).toBeInTheDocument();
  expect(profileInformation).toHaveTextContent("Age:");
  expect(profileInformation).toHaveTextContent("Birthday:");
  expect(profileInformation).toHaveTextContent("Address:");

  // Assigned doctor card element
  const assignedDoctorCardElement = screen.getByTestId("card-2");
  expect(assignedDoctorCardElement).toBeInTheDocument();
  expect(assignedDoctorCardElement).toHaveTextContent("Assigned Doctor");
  expect(assignedDoctorCardElement).toHaveTextContent("Name:");

  // Status card element
  const statusCardElement = screen.getByTestId("card-3");
  expect(statusCardElement).toBeInTheDocument();
  expect(statusCardElement).toHaveTextContent("Status");

  // Symptom history table element
  const symptomHistoryElement = screen.getByTestId("table-1");
  expect(symptomHistoryElement).toBeInTheDocument();
  expect(symptomHistoryElement).toHaveTextContent("STATUS HISTORY");

  // Diary history table element
  const diaryHistoryElement = screen.getByTestId("table-2");
  expect(diaryHistoryElement).toBeInTheDocument();
  expect(diaryHistoryElement).toHaveTextContent("DIARY HISTORY");
});

afterEach(() => {
  cleanup();
});
