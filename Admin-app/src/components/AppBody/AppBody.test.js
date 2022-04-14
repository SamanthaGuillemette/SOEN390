import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as redux from "react-redux";
import { MemoryRouter } from "react-router-dom";
import AppBody from ".";

const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({ test: "test" });

const spy2 = jest.spyOn(redux, "useDispatch");
spy2.mockReturnValue({ test: "test" });

test("should render app body", () => {
  render(
    <MemoryRouter>
      <AppBody />
    </MemoryRouter>
  );
});

afterEach(() => {
  cleanup();
});
