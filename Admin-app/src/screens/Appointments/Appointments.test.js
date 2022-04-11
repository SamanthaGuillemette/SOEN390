import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Appointments from ".";

test("Appointments should render without errors", () => {
<Provider>
  render(<Appointments />);
</Provider>
});

afterEach(() => {
  cleanup();
});
