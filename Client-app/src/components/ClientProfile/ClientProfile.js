import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClientProfile from ".";

test("ClientProfile should render without errors", () => {
  render(<ClientProfile />);
});

afterEach(() => {
  cleanup();
});
