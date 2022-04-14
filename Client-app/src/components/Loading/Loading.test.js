import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "./index";

test("should render the Loading", () => {
  render(<Loading />);
});
