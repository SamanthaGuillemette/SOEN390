import { MemoryRouter } from "react-router-dom";
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./index";

// Unit and integration tests for the dashboard.

test("should get the dashboard" ,() =>{
    render(<MemoryRouter><Dashboard/></MemoryRouter>);

    // Checks text for card 1
    const card1 = screen.getByTestId("card1");
    expect(card1).toBeInTheDocument();
    expect(card1).toHaveTextContent(/^InfoCovid-19 Testing PoliciesFind out how you could get tested if you develop any symptoms to the virus.$/);
    expect(card1).toHaveClass('cardShape1');
    
    
    //Checks text for card 2
    const card2 = screen.getByTestId("card2");
    expect(card2).toBeInTheDocument();
    expect(card2).toHaveTextContent(/^InfoData of COVID-19 in QuebecMost people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention.$/);
    expect(card2).toHaveClass('cardShape2');

    // Checks text for card 3
    const card3 = screen.getByTestId("card3");
    expect(card3).toBeInTheDocument();
    expect(card3).toHaveTextContent(/^InfoAppointment for vaccinationTo book a appointment for the vaccination, as well as check eligibilty, click on this link for more info.$/);
    expect(card3).toHaveClass('cardShape3');

    // Checks text for patientlist
    const plist = screen.getByTestId("patientlist");
    expect(plist).toBeInTheDocument();
    expect(plist).toHaveTextContent(/^Patient's list$/);
    expect(plist).toHaveClass('listTitle');


});

afterEach(() =>{
    cleanup();
});

