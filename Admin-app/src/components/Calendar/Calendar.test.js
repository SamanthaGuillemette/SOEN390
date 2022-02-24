import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from ".";

test("Calendar component has month-week-day buttons", () => {
  render(<Calendar />);

  // Check that the text content is there and if a we get a value by role if its there or not as well.
  const monthButton = screen.getByRole("button", { name: /month view/i });
  expect(monthButton.textContent).toContain("month");

  const weekButton = screen.getByRole("button", { name: /week view/i });
  expect(weekButton.textContent).toContain("week");

  const dayButton = screen.getByRole("button", { name: /day view/i });
  expect(dayButton.textContent).toContain("day");
});

afterEach(() => {
  cleanup();
});
