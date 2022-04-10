import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import DiaryTable from "./index";

test("should render the diary table", () => {
  <Provider>
    render(
    <DiaryTable />
    );
  </Provider>;
});
