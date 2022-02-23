import {screen, render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "./index";

test("should render sign in button", () =>{
    render(<SignIn/>);
});

afterEach(() => {
    cleanup();
})