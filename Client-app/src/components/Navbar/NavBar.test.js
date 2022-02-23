import {screen, render, cleanup} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import "@testing-library/jest-dom";
import Navbar from "./index";

test("should render the top navbar", () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);

    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Covid-19 App");
    expect(title).toBeVisible();
    


});
