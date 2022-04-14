import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateStatus from "./index";
import StatusModal from "./StatusModal";
import SymptomsTable from "./SymptomsTable";
import * as redux from 'react-redux'

const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue({ test:'test' })

test("Update Status should render without errors", () => {
  render(<UpdateStatus />);
  const statusBoxElement = screen.getByTestId("status-box");
  expect(statusBoxElement).toBeInTheDocument();
  expect(statusBoxElement).toHaveClass("Update-Status__box");
});

test("Status Modal should render without errors", () => {
  render(<StatusModal />);
});

test("Symptoms table should render without errors", () => {
  render(<SymptomsTable />);
});

afterEach(() => {
  cleanup();
});