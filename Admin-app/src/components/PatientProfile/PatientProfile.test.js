import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import PatientProfile from ".";

test("PatientProfile should render without errors", () => {
  render(<PatientProfile />);

  // Avatar card element
  const avatarCardElement = screen.getByTestId("card-1");
  expect(avatarCardElement).toBeInTheDocument();
  expect(avatarCardElement).toHaveTextContent('Age:');
});

afterEach(() => {
  cleanup();
});
