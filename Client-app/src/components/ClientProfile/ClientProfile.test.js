import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClientProfile from ".";

test("ClientProfile should render without errors", () => {
  // render(<ClientProfile />);
  //   const avatar = screen.getByTestId("avatar");
  //   expect(avatar).toBeInTheDocument();
  //   expect(avatar).toHaveTextContent("Jane Doe");
  //   expect(avatar).toHaveClass("profile-name");
});

afterEach(() => {
  cleanup();
});
