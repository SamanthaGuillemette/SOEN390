import {MemoryRouter} from "react-router-dom";
import {screen, cleanup, render} from "@testing-library/react";
import "@testing-library/jest-dom";
import UpcomingEvents from "./index";

test("should render simple upcoming events test", () =>{
    render(<MemoryRouter><UpcomingEvents/></MemoryRouter>);
    const upevents = screen.getByTestId('up-events');
    expect(upevents).toBeInTheDocument();
    expect(upevents).toHaveTextContent(/^Blood Donations$/);
    expect(upevents).toHaveClass('UPCOMING-EVENTS__title');
});

afterEach(() =>{
    cleanup();
}
)