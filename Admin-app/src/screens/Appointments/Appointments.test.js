import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Appointments from ".";

test("Appointments should render without errors", () => {
  render(<Appointments />);
});

afterEach(() => {
  cleanup();
});
