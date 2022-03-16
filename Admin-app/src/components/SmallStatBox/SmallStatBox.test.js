import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SmallStatBox from "./index";

test("SmallStatbox should render without errors", () => {
  render(<SmallStatBox />);
  const sb1 = screen.getByTestId('statbox1');
  expect(sb1).toBeInTheDocument();
  expect(sb1).toHaveClass('STAT__BOX');
});

afterEach(() => {
  cleanup();
});
