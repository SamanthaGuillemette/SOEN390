import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Patients from ".";

test("Patient should render without errors", () => {
  render(<Patients />);
});

afterEach(() => {
  cleanup();
});
