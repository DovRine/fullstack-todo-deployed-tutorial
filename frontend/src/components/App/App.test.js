import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { App } from "..";

describe("App", () => {
  it("exists", () => {
    expect(typeof App).toBe("function");
  });
  it('has className "App"', () => {
    render(<App />);
    const ui = screen.getByTestId("App");
    expect(ui).toHaveClass("App");
  });
  it("shows a list of todos", () => {
    render(<App />);
    screen.getByTestId("TodoList");
  });
  it("has a form for adding tasks", () => {
    render(<App />);
    screen.getByTestId("TodoForm");
  });
  it("adds a task to the list", () => {
    const task = "test task";
    render(<App />);
    const input = screen.getByRole("textbox");
    const btn = screen.getByRole("button");

    userEvent.type(input, task);
    btn.click();

    const list = screen.getByTestId("TodoList");

    expect(list).toHaveTextContent(task);
  });
});
