import { MemoryRouter } from "react-router-dom";
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import EventButton from "../EventButton/index";
import EventList  from "./EventList";
import EventDetails from "./EventDetails";


// Unit and integration tests for all the event components.

test("should render event button", () => {
render(<MemoryRouter><EventButton /></MemoryRouter>);


});

test("should render event list", () => {
render(<MemoryRouter><EventList /></MemoryRouter>);


 });

test("should render event details", () => {
render(<MemoryRouter><EventDetails /></MemoryRouter>);

});



afterEach(() => {
    cleanup();
});