import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminList from ".";

test("Patient should render without errors", () => {
  render(<AdminList />);
});

afterEach(() => {
  cleanup();
});
