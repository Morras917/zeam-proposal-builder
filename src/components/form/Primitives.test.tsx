import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Text, Num, TextArea, Select, Segmented, Toggle, LogoUploader, Field, Row } from "./Primitives";

/* ── Field ── */
describe("Field", () => {
  it("renders label and children", () => {
    render(
      <Field label="Client name">
        <input data-testid="input" />
      </Field>,
    );
    // CSS `uppercase` is visual only — DOM text stays as written in JSX
    expect(screen.getByText("Client name")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });
});

/* ── Row ── */
describe("Row", () => {
  it("renders children in a flex row", () => {
    render(
      <Row>
        <span>A</span>
        <span>B</span>
      </Row>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});

/* ── Text ── */
describe("Text", () => {
  it("renders with the given value", () => {
    render(<Text value="African Bank" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue("African Bank")).toBeInTheDocument();
  });

  it("calls onChange with the new string value", () => {
    const onChange = vi.fn();
    render(<Text value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Acme" } });
    expect(onChange).toHaveBeenCalledWith("Acme");
  });

  it("renders placeholder text", () => {
    render(<Text value="" onChange={vi.fn()} placeholder="Enter name…" />);
    expect(screen.getByPlaceholderText("Enter name…")).toBeInTheDocument();
  });
});

/* ── Num ── */
describe("Num", () => {
  it("renders a number input with the given value", () => {
    render(<Num value={24} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue("24")).toBeInTheDocument();
  });

  it("calls onChange with a numeric value", () => {
    const onChange = vi.fn();
    render(<Num value={0} onChange={onChange} />);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "42" } });
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it("renders an optional label above the input", () => {
    render(<Num value={5} onChange={vi.fn()} label="Qty" />);
    expect(screen.getByText("Qty")).toBeInTheDocument();
  });

  it("does not render a label when none provided", () => {
    const { container } = render(<Num value={5} onChange={vi.fn()} />);
    expect(container.querySelector("span")).toBeNull();
  });
});

/* ── TextArea ── */
describe("TextArea", () => {
  it("renders with the given value", () => {
    render(<TextArea value="Hello world" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue("Hello world")).toBeInTheDocument();
  });

  it("calls onChange with new text", () => {
    const onChange = vi.fn();
    render(<TextArea value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "New text" } });
    expect(onChange).toHaveBeenCalledWith("New text");
  });

  it("renders placeholder", () => {
    render(<TextArea value="" onChange={vi.fn()} placeholder="Add a note…" />);
    expect(screen.getByPlaceholderText("Add a note…")).toBeInTheDocument();
  });
});

/* ── Select ── */
describe("Select", () => {
  const options = [
    { value: "", label: "— None —" },
    { value: "PAY-5K", label: "Payout 5K · $5,500/mo" },
    { value: "PAY-10K", label: "Payout 10K · $9,000/mo" },
  ];

  it("renders all options", () => {
    render(<Select value="" onChange={vi.fn()} options={options} />);
    expect(screen.getByRole("option", { name: "— None —" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Payout 5K · $5,500/mo" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Payout 10K · $9,000/mo" })).toBeInTheDocument();
  });

  it("shows the currently selected value", () => {
    render(<Select value="PAY-5K" onChange={vi.fn()} options={options} />);
    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe("PAY-5K");
  });

  it("calls onChange when a different option is selected", () => {
    const onChange = vi.fn();
    render(<Select value="" onChange={onChange} options={options} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "PAY-10K" } });
    expect(onChange).toHaveBeenCalledWith("PAY-10K");
  });
});

/* ── Segmented ── */
describe("Segmented", () => {
  const options = [
    { value: "BA", label: "Business Account" },
    { value: "INFRA", label: "Infrastructure / API" },
    { value: "BOTH", label: "Both" },
  ];

  it("renders all option buttons", () => {
    render(<Segmented value="BOTH" onChange={vi.fn()} options={options} />);
    expect(screen.getByRole("button", { name: "Business Account" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Infrastructure / API" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Both" })).toBeInTheDocument();
  });

  it("calls onChange with the clicked option value", () => {
    const onChange = vi.fn();
    render(<Segmented value="BOTH" onChange={onChange} options={options} />);
    fireEvent.click(screen.getByRole("button", { name: "Business Account" }));
    expect(onChange).toHaveBeenCalledWith("BA");
  });

  it("applies the active style only to the selected option", () => {
    render(<Segmented value="BA" onChange={vi.fn()} options={options} />);
    const activeBtn = screen.getByRole("button", { name: "Business Account" });
    const inactiveBtn = screen.getByRole("button", { name: "Both" });
    expect(activeBtn.className).toContain("text-violet-700");
    expect(inactiveBtn.className).not.toContain("text-violet-700");
  });
});

/* ── Toggle ── */
describe("Toggle", () => {
  it("renders in the 'off' state", () => {
    render(<Toggle on={false} onChange={vi.fn()} />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-stone-200");
    expect(btn.className).not.toContain("bg-violet-600");
  });

  it("renders in the 'on' state", () => {
    render(<Toggle on={true} onChange={vi.fn()} />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-violet-600");
  });

  it("calls onChange with toggled value when clicked", () => {
    const onChange = vi.fn();
    render(<Toggle on={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange(false) when toggled off", () => {
    const onChange = vi.fn();
    render(<Toggle on={true} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalledWith(false);
  });
});

/* ── LogoUploader ── */
describe("LogoUploader", () => {
  it("shows first letter of clientName when no logo", () => {
    render(<LogoUploader value="" onChange={vi.fn()} clientName="African Bank" />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("Drop logo here or choose file")).toBeInTheDocument();
  });

  it("shows fallback '?' when clientName is empty", () => {
    render(<LogoUploader value="" onChange={vi.fn()} clientName="" />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("shows 'Logo uploaded' text when a logo value is set", () => {
    const { container } = render(
      <LogoUploader
        value="data:image/png;base64,abc123"
        onChange={vi.fn()}
        clientName="Acme"
      />,
    );
    expect(screen.getByText("Logo uploaded")).toBeInTheDocument();
    // alt="" gives the img role=presentation; query by element type instead
    expect(container.querySelector("img")).toBeInTheDocument();
  });

  it("shows Remove button when logo is set", () => {
    render(
      <LogoUploader
        value="data:image/png;base64,abc123"
        onChange={vi.fn()}
        clientName="Acme"
      />,
    );
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
  });

  it("calls onChange('') when Remove is clicked", () => {
    const onChange = vi.fn();
    render(
      <LogoUploader
        value="data:image/png;base64,abc123"
        onChange={onChange}
        clientName="Acme"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("does not show Remove button when no logo", () => {
    render(<LogoUploader value="" onChange={vi.fn()} clientName="Acme" />);
    expect(screen.queryByRole("button", { name: "Remove" })).toBeNull();
  });
});
