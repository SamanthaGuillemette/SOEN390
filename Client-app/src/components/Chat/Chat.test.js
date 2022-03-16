import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chat from "."

test("Chat should render without errors", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    render(<Chat/>)
  });
  
  afterEach(() => {
    cleanup();
  });