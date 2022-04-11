import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import * as redux from "react-redux";
import Navbar from "./index";

const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({ test: "test" });

const spy2 = jest.spyOn(redux, "useDispatch");
spy2.mockReturnValue({ test: "test" });

test("should render the top navbar", () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  // Checks if navbar has been rendered
  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Covid-19 App");
  expect(title).toBeVisible();
});
