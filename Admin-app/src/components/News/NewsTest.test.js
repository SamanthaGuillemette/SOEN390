import { MemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsDetails from "./NewsDetails";
import NewsList from "./NewsList";
import News from ".";

test("should render news details", () => {
  render(
    <MemoryRouter>
      <NewsDetails />
    </MemoryRouter>
  );
});

test("should render news", () => {
  render(<News />);
});

test("should render news list", () => {
  render(
    <MemoryRouter>
      <NewsList />
    </MemoryRouter>
  );
});

afterEach(() => {
  cleanup();
});
