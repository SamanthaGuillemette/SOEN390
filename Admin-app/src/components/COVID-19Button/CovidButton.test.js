import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import COVID19Button from "./index"

test("should render covid button", () => {
    render(<COVID19Button />);
    const covidbutton = screen.getByTestId("covid-1");
    expect(covidbutton).toBeInTheDocument();

  });
  
  afterEach(() => {
    cleanup();
  });