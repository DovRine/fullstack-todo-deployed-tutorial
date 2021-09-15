import { render, screen } from "@testing-library/react";
import { EmptyList } from "..";

describe("EmptyList", () => {
  it("exists", () => {
    expect(typeof EmptyList).toBe("function");
  });
  it('has class "EmptyList"', () => {
    render(<EmptyList />);
    const ui = screen.getByTestId("EmptyList");
    expect(ui).toHaveClass("EmptyList");
  });
  it("shows a message about not having todos", () => {
    render(<EmptyList />);
    const ui = screen.getByTestId("EmptyList");
    expect(ui).toHaveTextContent(/todo/i);
  });
});
