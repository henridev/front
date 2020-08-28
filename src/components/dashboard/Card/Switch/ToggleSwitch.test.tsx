import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import ToggleSwitch from "./ToggleSwitch";

describe("ToggleSwitch component", () => {
  const mockHandler = jest.fn();
  const stubbedCheckedValue = false;

  it("it triggers an event handler on toggler click", () => {
    const { getByRole } = render(
      <ToggleSwitch handler={mockHandler} checked={stubbedCheckedValue} />
    );

    fireEvent.click(getByRole("checkbox") as HTMLInputElement);

    expect(mockHandler).toBeCalledTimes(1);
  });

  it("it toggles the checkbox", () => {
    const { getByRole, rerender } = render(
      <ToggleSwitch handler={mockHandler} checked={stubbedCheckedValue} />
    );

    const toggler = getByRole("checkbox") as HTMLInputElement;
    expect(toggler.checked).toBe(stubbedCheckedValue);

    rerender(
      <ToggleSwitch handler={mockHandler} checked={!stubbedCheckedValue} />
    );
    expect(toggler).toBeChecked();
  });
});

afterEach(cleanup);
