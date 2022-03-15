import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import DoctorInfo from "./index";

test("DoctorInfo should render without errors", () => {
  render(<DoctorInfo />);

  const avatar = screen.getByTestId("avatar");
  expect(avatar).toBeInTheDocument();
  expect(avatar).toHaveTextContent("Jamal Doe");
  expect(avatar).toHaveClass("doctorInfo-card__profileName");
});

afterEach(() => {
  cleanup();
});
