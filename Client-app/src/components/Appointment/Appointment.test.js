import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as redux from 'react-redux';
import { MemoryRouter } from "react-router-dom";
import Appointment from "./index";
import AppointmentDetails from "./AppointmentDetails";


const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue({ test:'test' })

test("Appointment should render without errors", () => {
    render(
    <Appointment />);
    const appointmentBoxElement = screen.getByTestId("appointment-box");
    expect(appointmentBoxElement).toBeInTheDocument();
    expect(appointmentBoxElement).toHaveTextContent("You never had an appointment with your doctor");
});

test("Appointment Details should render without errors", () => {
    render(
    <MemoryRouter>
        <AppointmentDetails />
    </MemoryRouter>
    );
});

afterEach(() => {
  cleanup();
});