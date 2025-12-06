import { render, screen } from "@testing-library/react";
import HomePage from "./page";

test("renders title", () => {
  render(<HomePage />);
  expect(screen.getByText(/React TS Starter Kit/i)).toBeInTheDocument();
});
