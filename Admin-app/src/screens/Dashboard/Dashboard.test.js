import { MemoryRouter } from "react-router-dom";
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./index";


test("should get the dashboard" ,() =>{
    render(<MemoryRouter><Dashboard/></MemoryRouter>);

    const card1 = screen.getByTestId("card1");
    expect(card1).toBeInTheDocument();

    const card2 = screen.getByTestId("card2");
    expect(card2).toBeInTheDocument();

    const card3 = screen.getByTestId("card3");
    expect(card3).toBeInTheDocument();


});

afterEach(() =>{
    cleanup();
});

