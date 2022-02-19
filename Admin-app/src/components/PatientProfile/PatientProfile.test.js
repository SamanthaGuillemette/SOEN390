import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import PatientProfile from ".";

test.skip("PatientProfile should render without errors", () => {
  render(<PatientProfile />);
});

afterEach(() => {
  cleanup();
});
