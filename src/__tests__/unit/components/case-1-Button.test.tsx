import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Button, { TButtonProps } from "components/Form/SubmitButton/Button";
import ReactDOM from "react-dom";

describe("The <Button /> component", () => {
  const defaultButtonProps: TButtonProps = {
    isLoading: false,
    content: "click",
    onClick: jest.fn(),
  };
  const setupButton = (props = defaultButtonProps) =>
    render(<Button {...props} />);

  it("Should render the button and the content user will see", () => {
    // using react dom
    const container = document.createElement("div");
    ReactDOM.render(<Button {...defaultButtonProps} />, container);
    expect(container.querySelector("button")).not.toBeNull();

    const { asFragment, getByText } = setupButton();
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(defaultButtonProps.content)).toBeInTheDocument();
  });

  it("Should call the click handler when provided", () => {
    const { getByTestId } = setupButton();
    const button = getByTestId("button");
    fireEvent.click(button);
    expect(defaultButtonProps.onClick).toHaveBeenCalled();
  });

  it("Should remove content text when loading", () => {
    const { queryByTestId } = setupButton({
      ...defaultButtonProps,
      isLoading: true,
    });

    expect(queryByTestId("content")).toBeNull();
  });
});
