import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Scanner from ".";

test("Scanner should render without errors", () => {
  render(<Scanner />);
});

afterEach(() => {
  cleanup();
});