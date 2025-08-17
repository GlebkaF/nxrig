import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DiffViewer from "./DiffViewer";

describe("DiffViewer", () => {
  it("renders simple diff correctly", () => {
    const diff = {
      name: { before: "old", after: "new" },
    };

    render(<DiffViewer diff={diff} />);

    expect(screen.getByText('"old"')).toHaveClass("line-through");
    expect(screen.getByText('"new"')).toBeInTheDocument();
  });

  it("renders nested diff correctly", () => {
    const diff = {
      settings: {
        volume: { before: 0.5, after: 0.7 },
        enabled: { before: false, after: true },
      },
    };

    render(<DiffViewer diff={diff} />);

    expect(screen.getByText("settings:")).toBeInTheDocument();
    expect(screen.getByText("volume:")).toBeInTheDocument();
    expect(screen.getByText("enabled:")).toBeInTheDocument();
    expect(screen.getByText("0.5")).toHaveClass("line-through");
    expect(screen.getByText("0.7")).toBeInTheDocument();
  });
});
