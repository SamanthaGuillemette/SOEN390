import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as redux from 'react-redux';
import DiaryTable from "./index";

test("should render the diary table", () => {
  const spy = jest.spyOn(redux, 'useSelector')
  spy.mockReturnValue({ test:'test' })
  render(
  <DiaryTable />);
  const diaryList = screen.getByTestId("diary-list");
  expect(diaryList).toBeInTheDocument();
  expect(diaryList).toHaveClass("diary__list");
});

afterEach(() => {
  cleanup();
});
