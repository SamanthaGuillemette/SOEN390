import { MemoryRouter } from "react-router-dom";
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsDetails from "./NewsDetails"

test("should render news details", () =>{

    render(<MemoryRouter><NewsDetails /></MemoryRouter>)


})
