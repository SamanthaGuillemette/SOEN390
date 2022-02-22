import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SmallStatBox from "./index";

test("SmallStatbox should render without errors", () => {
  render(<SmallStatBox />);
  const sb1 = screen.getByTestId('statbox1');
});

afterEach(() => {
  cleanup();
});
