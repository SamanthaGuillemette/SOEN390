import { MemoryRouter } from "react-router-dom";
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./index";

test("should get the dashboard" ,() =>{
    render(<MemoryRouter><Dashboard/></MemoryRouter>);
})