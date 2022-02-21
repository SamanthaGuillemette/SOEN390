import { MemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import DropdownConfirmation from "./index";

test("should render dropdown confirmation", () => {
    render(<MemoryRouter><DropdownConfirmation/></MemoryRouter>);
    const select = screen.getByTestId("select1");
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass('data');
});

afterEach(() => {
    cleanup();
})