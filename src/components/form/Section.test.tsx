import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Section } from "./Section";

describe("Section", () => {
  it("renders the section number and title", () => {
    render(<Section num="01" title="Client & deal"><p>content</p></Section>);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Client & deal")).toBeInTheDocument();
  });

  it("shows children by default (defaultOpen=true)", () => {
    render(<Section num="01" title="Test"><p>visible content</p></Section>);
    const content = screen.getByText("visible content");
    // data-open="true" means section is expanded
    expect(content.closest("[data-open]")).toHaveAttribute("data-open", "true");
  });

  it("hides children when defaultOpen=false", () => {
    render(
      <Section num="02" title="Closed" defaultOpen={false}>
        <p>hidden content</p>
      </Section>,
    );
    const content = screen.getByText("hidden content");
    expect(content.closest("[data-open]")).toHaveAttribute("data-open", "false");
  });

  it("toggles open/closed when header button is clicked", () => {
    render(<Section num="01" title="Toggle Me"><p>body</p></Section>);
    const btn = screen.getByRole("button");
    const contentWrapper = screen.getByText("body").closest("[data-open]");

    // Initially open
    expect(contentWrapper).toHaveAttribute("data-open", "true");

    // Click to close
    fireEvent.click(btn);
    expect(contentWrapper).toHaveAttribute("data-open", "false");

    // Click again to re-open
    fireEvent.click(btn);
    expect(contentWrapper).toHaveAttribute("data-open", "true");
  });

  it("renders multiple children", () => {
    render(
      <Section num="03" title="Multi">
        <span>child one</span>
        <span>child two</span>
      </Section>,
    );
    expect(screen.getByText("child one")).toBeInTheDocument();
    expect(screen.getByText("child two")).toBeInTheDocument();
  });
});
