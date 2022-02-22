import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import PatientProfile from ".";

test("PatientProfile should render without errors", () => {
  render(<PatientProfile />);

  // Avatar card element
  const avatarCardElement = screen.getByTestId("card-1");
  expect(avatarCardElement).toBeInTheDocument();
  expect(avatarCardElement).toHaveTextContent('Age:');

  // Status card element
  const statusCardElement = screen.getByTestId("card-2");
  expect(statusCardElement).toBeInTheDocument();
  expect(statusCardElement).toHaveTextContent('Status');

  // Symptom details table element
  const symptomDetailsElement = screen.getByTestId("table-1");
  expect(symptomDetailsElement).toBeInTheDocument();
  expect(symptomDetailsElement).toHaveTextContent('SYMPTOM DETAILS');
});

afterEach(() => {
  cleanup();
});
