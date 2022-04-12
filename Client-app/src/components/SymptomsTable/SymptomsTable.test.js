import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as redux from "react-redux";
import SymptomsTable from "./index";

test("Symptoms Table should render without errors", () => {
  const spy = jest.spyOn(redux, "useSelector");
  spy.mockReturnValue({ test: "test" });
  render(<SymptomsTable />);
});

afterEach(() => {
  cleanup();
});
