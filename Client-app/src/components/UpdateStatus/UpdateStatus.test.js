import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import UpdateStatus from "./index";

test("Update Status should render without errors", () => {
<Provider>
  render(<UpdateStatus />);
</Provider>
});

afterEach(() => {
  cleanup();
});