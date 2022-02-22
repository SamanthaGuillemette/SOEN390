import {MemoryRouter} from "react-router-dom";
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import DoctorList from "./index";

test("should render doctor list component", () => {
    render(<DoctorList/>);
    const tablecontainer1 = screen.getByTestId("table-container1");
    expect(tablecontainer1).toBeInTheDocument();
})