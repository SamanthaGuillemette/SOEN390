import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as redux from 'react-redux';
import DiaryTable from "./index";
import DiaryAddModal from "./DiaryAddModal";

const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue({ test:'test' })

test("should render the diary table", () => {
  render(
  <DiaryTable />);
  const diaryList = screen.getByTestId("diary-list");
  expect(diaryList).toBeInTheDocument();
  expect(diaryList).toHaveClass("diary__list");
});

test("should render the diary add modal", () => {
  render(
  <DiaryAddModal />);
});


afterEach(() => {
  cleanup();
});