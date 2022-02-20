import { MemoryRouter } from "react-router-dom";
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import EventButton from "../EventButton/index"


test("should render event button", () => {
render(<MemoryRouter><EventButton /></MemoryRouter>)


});

afterEach(() => {
    cleanup();
});