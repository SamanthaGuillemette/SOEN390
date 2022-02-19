import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUp from ".";

test("SignUp should render without errors", () => {
  render(<SignUp />);
});

afterEach(() => {
  cleanup();
});
