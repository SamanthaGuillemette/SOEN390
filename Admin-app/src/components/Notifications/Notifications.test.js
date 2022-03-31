import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Notifications from ".";
import { Provider } from "react-redux";

// Unit and integration tests for notifications
test("Notifications component renders on screen", () => {
  <Provider>
    render(
    <Notifications />
    const updatedStatus = screen.getByTestId("notify");
    expect(updatedStatus).toBeInTheDocument();
  </Provider>;
});

afterEach(() => {
  cleanup();
});
