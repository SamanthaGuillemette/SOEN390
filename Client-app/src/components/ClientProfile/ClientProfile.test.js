import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as redux from 'react-redux';
import ClientProfile from ".";

test("ClientProfile should render without errors", () => {
  const spy = jest.spyOn(redux, 'useSelector')
  spy.mockReturnValue({ test:'test' })
  render(
  <ClientProfile />);
  const avatar = screen.getByTestId("avatar");
  expect(avatar).toBeInTheDocument();
  expect(avatar).toHaveClass("profile-name");
});

afterEach(() => {
  cleanup();
});
