import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Notifications from ".";

// Unit and integration tests for notifications
test("Notifications component renders on screen", () => {
  render(<Notifications />);
  const updatedStatus = screen.getByTestId("notification-statusUpdate");
  expect(updatedStatus).toHaveTextContent("22 March, 2022. At 5:50 pm");
});

afterEach(() => {
  cleanup();
});
