import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as redux from 'react-redux';
import DoctorInfo from "./index";

test("DoctorInfo should render without errors", () => {
  const spy = jest.spyOn(redux, 'useSelector')
  spy.mockReturnValue({ test:'test' })
  render(<DoctorInfo />);
  const avatar = screen.getByTestId("avatar");
  expect(avatar).toBeInTheDocument();
  expect(avatar).toHaveClass("doctorInfo-card__profileName");
});

afterEach(() => {
  cleanup();
});