import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import DiaryTable from "./index";

test("should render the diary table", () => {
  render(<DiaryTable />);
});
