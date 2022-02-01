import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from ".";

test("Calendar component has month-week-day buttons", () => {
  render(<Calendar />);

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
