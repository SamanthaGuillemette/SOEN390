import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import PatientList from ".";
import SingleRow from "./SingleRow";

describe("SingleRow", () => {
  const props = {
    row: {
      personalInfo: [],
    },
  };

  it("should render successfully", () => {
    render(<SingleRow {...props} />);
  });
});

// Unit and integration tests for the patient list
test("PatientList should render without errors", () => {
  render(<PatientList />);
});

afterEach(() => {
  cleanup();
});
