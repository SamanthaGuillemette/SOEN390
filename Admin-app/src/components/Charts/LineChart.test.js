import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import LineChart from "./LineChart";

test("LineChart should render without errors", () => {
  render(<LineChart />);
});

afterEach(() => {
  cleanup();
});
