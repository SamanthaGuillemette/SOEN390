import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminList from ".";
import EachRow from "./EachRow";

describe("EachRow", () => {
  const props = {
    row: {},
  };

  it("should render successfully", () => {
    render(<EachRow {...props} />);
  });
});

test("Patient should render without errors", () => {
  render(<AdminList />);
});

afterEach(() => {
  cleanup();
});
