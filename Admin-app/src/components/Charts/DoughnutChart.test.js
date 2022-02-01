import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import DoughnutChart from "./DoughnutChart";

test("DoughnutChart should render without errors", () => {
  render(<DoughnutChart />);
});

afterEach(() => {
  cleanup();
});
