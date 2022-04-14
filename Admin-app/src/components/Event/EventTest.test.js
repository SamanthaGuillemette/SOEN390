import { MemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventList from "./EventList";
import EventDetails from "./EventDetails";
import Event from ".";

// Unit and integration tests for all the event components.

test("should render event list", () => {
  render(
    <MemoryRouter>
      <EventList />
    </MemoryRouter>
  );
});

test("should render events", () => {
  render(<Event />);
});

test("should render event details", () => {
  render(
    <MemoryRouter>
      <EventDetails />
    </MemoryRouter>
  );
});

afterEach(() => {
  cleanup();
});
