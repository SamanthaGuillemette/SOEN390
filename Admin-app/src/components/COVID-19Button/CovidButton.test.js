import {MemoryRouter} from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import COVID19Button from "./index"

test("should render covid button", () => {
    
    // Render unit test and then integration to see the button is in the document
    render(<MemoryRouter><COVID19Button/></MemoryRouter>);
    const covidbutton = screen.getByTestId("covid-1");
    expect(covidbutton).toBeInTheDocument();
  
  });
  
  afterEach(() => {
    cleanup();
  });