import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./index";
import {MemoryRouter} from "react-router-dom";

test("should render dashboard", () => {
    render(<MemoryRouter><Dashboard/></MemoryRouter>);

    // Checks if the dashboard has been rendered and interacts properly.

    const appointment = screen.getByTestId("appointment");
    expect(appointment).toBeInTheDocument();
    expect(appointment).toHaveTextContent("Appointment");
    expect(appointment).toHaveClass("dashboard-card__title");
});

afterEach(() => {
    cleanup();
});
