import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateStatus from "./index";
import * as redux from 'react-redux'

test("Update Status should render without errors", () => {
  const spy = jest.spyOn(redux, 'useSelector')
  spy.mockReturnValue({ test:'test' })
  render(<UpdateStatus />);
});

afterEach(() => {
  cleanup();
});