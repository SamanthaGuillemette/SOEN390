import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from ".";

test("SignIn should render without errors", () => {
  render(<SignIn />);
});

afterEach(() => {
  cleanup();
});
