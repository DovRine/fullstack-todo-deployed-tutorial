import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoForm } from "..";

describe("TodoForm", () => {
  it("exists", () => {
    expect(typeof TodoForm).toBe("function");
  });
  it('has class "TodoForm"', () => {
    render(<TodoForm />);
    const ui = screen.getByTestId("TodoForm");
    expect(ui).toHaveClass("TodoForm");
  });
  it("has an input for a todo task", () => {
    render(<TodoForm />);
    screen.getByRole("textbox");
  });
  it("has a submit button", () => {
    render(<TodoForm />);
    screen.getByRole("button");
  });
  it("adds a todo", () => {
    const mockHandleSubmit = jest.fn();
    render(<TodoForm handleSubmit={mockHandleSubmit} />);
    const task = "test task";
    const input = screen.getByRole("textbox");
    const btn = screen.getByRole("button");

    userEvent.type(input, task);
    btn.click();

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith({ task });
  });
});
