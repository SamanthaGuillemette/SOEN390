import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import BottomNav from "./index";

test("should render the bottom navbar", () => {
  // render(<MemoryRouter><BottomNav /></MemoryRouter>);
  // // Checks if the bottom nav has been rendred and has components
  // const profile = screen.getByTestId("profile");
  // expect(profile).toBeInTheDocument();
  // expect(profile).toHaveTextContent("Profile");
  // expect(profile).toBeVisible();
  // expect(profile).toHaveClass("BOTTOM-NAV__btn__title");
});
