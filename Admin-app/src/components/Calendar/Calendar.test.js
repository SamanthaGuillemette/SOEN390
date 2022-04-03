import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from ".";
import { Provider } from "react-redux";

test("Calendar component has month-week-day buttons", () => {
  <Provider>
    render(
    <Calendar />
    ); const monthButton = screen.getByRole("button", {/month view/i});
    expect(monthButton.textContent).toContain("month"); const weekButton =
    screen.getByRole("button", {/week view/i});
    expect(weekButton.textContent).toContain("week"); const dayButton =
    screen.getByRole("button", {/day view/i});
    expect(dayButton.textContent).toContain("day");
  </Provider>;
});

afterEach(() => {
  cleanup();
});
