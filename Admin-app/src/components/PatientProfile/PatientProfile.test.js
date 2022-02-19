import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import PatientProfile from ".";

test("PatientProfile should render without errors", () => {
  render(<PatientProfile />);
});

afterEach(() => {
  cleanup();
});
