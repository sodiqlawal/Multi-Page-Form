import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  waitForElement,
  getByText,
} from "@testing-library/react";

import { MyErrorMessage, MyField, MyFieldProps } from "components/Form/Form";
import { Form, Formik } from "formik";
import { TFormData } from "pages/CreateProduct/formUtils";

describe("Input", () => {
  const initialValues: Partial<TFormData> = {
    name: "",
  };
  const defaultInputProps: MyFieldProps & { content: string } = {
    name: "name",
    content: "Submit",
  };
  const validate = (): Partial<TFormData> => ({
    name: "Required",
    title: "Required",
  });
  const submit = jest.fn();
  const setupInput = (props = defaultInputProps) =>
    render(
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={submit}
      >
        <Form data-testid="form">
          <label htmlFor={defaultInputProps.name} />
          <MyField data-testid={props.name} {...props} />
          <MyErrorMessage data-testid={`${props.name}-error`} {...props} />
          <button type="submit">{props.content}</button>
        </Form>
      </Formik>
    );

  it("should show validation on blur", async () => {
    const { getByTestId } = setupInput();

    const input = getByTestId(defaultInputProps.name);
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId(`${defaultInputProps.name}-error`)).not.toBe(null);
      expect(getByTestId(`${defaultInputProps.name}-error`)).toHaveTextContent(
        "Required"
      );
    });
  });

  // it("rendering and submitting form", async () => {
  //   const { getByTestId, getByText } = setupInput();
  //   const input = getByTestId(defaultInputProps.name);

  //   fireEvent.change(input, { target: { value: "John" } });
  //   await waitFor(() => getByText("John"));
  // });
});
