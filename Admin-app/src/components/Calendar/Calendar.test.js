import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as redux from "react-redux";
import Calendar from ".";

const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({ test: "test" });

test("should render Calendar", () => {
  render(<Calendar />);
});

afterEach(() => {
  cleanup();
});
