import {screen, render, cleanup} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import "@testing-library/jest-dom";
import BottomNav from "./index";

test("should render the bottom navbar", () => {
    render(<MemoryRouter><BottomNav /></MemoryRouter>);
});
