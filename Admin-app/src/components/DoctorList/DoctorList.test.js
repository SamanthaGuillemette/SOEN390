import {MemoryRouter} from "react-router-dom";
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import DoctorList from "./index";

test("should render doctor list component", () => {
    render(<DoctorList/>);

    //Unit and interaction test for doctor list component
    const tablecontainer1 = screen.getByTestId("table-container1");
    expect(tablecontainer1).toBeInTheDocument();
    expect(tablecontainer1).toHaveClass('patient-doctor-list');

    const healthicon = screen.getByTestId("health-icon");
    expect(healthicon).toBeInTheDocument();
    expect(healthicon).toHaveClass('patients-icon');
})