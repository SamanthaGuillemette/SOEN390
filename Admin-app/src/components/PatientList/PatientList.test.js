import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import PatientList from ".";

test("PatientList should render without errors", () => {
  render(<PatientList />);
});

afterEach(() => {
  cleanup();
});
