import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatList from "./ChatList"

test("Chat should render without errors", () => {
    render(<ChatList />);
  });
  
  afterEach(() => {
    cleanup();
  });
  