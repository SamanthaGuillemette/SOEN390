import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppBody from ".";

test("Patient should render without errors", () => {
  render(<AppBody />);
});

afterEach(() => {
  cleanup();
});
