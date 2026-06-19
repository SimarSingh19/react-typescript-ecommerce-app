import { render, screen } from "@testing-library/react";

import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
  it("renders error message text", () => {
    render(<ErrorMessage message="Something went wrong" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});