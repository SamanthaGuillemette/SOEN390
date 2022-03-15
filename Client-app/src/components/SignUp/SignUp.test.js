import {screen, render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUp from "./index";

test("should render sign up button", () =>{
    render(<SignUp/>);
});

afterEach(() => {
    cleanup();
})