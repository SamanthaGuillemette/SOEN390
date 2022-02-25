import { MemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import DropdownConfirmation from "./index";
import DropdownDoctor from "../DropdownDoctor/index";
import DropdownStatus from "../DropdownStatus/index";

test("should render dropdown confirmation test", () => {
    // Unit and integration tests for dropdown confirmation.
    render(<MemoryRouter><DropdownConfirmation/></MemoryRouter>);
    const select = screen.getByTestId("select1");
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass('data');
});

   // Unit and integration tests for dropdown doctor.
test("should render dropdown doctor test", () => {
    render(<MemoryRouter><DropdownDoctor/></MemoryRouter>);
    const select2 = screen.getByTestId("select2");
    expect(select2).toBeInTheDocument();
    expect(select2).toHaveClass('data');
});

   // Unit and integration tests for dropdown status.
test("should render dropdown status test", () => {
    render(<MemoryRouter><DropdownStatus/></MemoryRouter>);
    const select3 = screen.getByTestId("select3");
    expect(select3).toBeInTheDocument();
});


afterEach(() => {
    cleanup();
})