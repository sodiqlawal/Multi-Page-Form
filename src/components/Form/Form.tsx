/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import {
  Field,
  ErrorMessage,
  FormikProps,
  useField,
  useFormikContext,
} from "formik";
import classNames from "classnames";
import white from "asset/white.png";
import "./Form.scss";
import titleCase from "lib/utils/titleCase";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import useFileUpload from "hooks/useFileUpload";
import SubmitButton from "./SubmitButton/Button";
import { readBase64 } from "lib/utils/fileHandler";
import { FormContext } from "pages/CreateProduct/formUtils";

export const MyErrorMessage: React.FC<{ name: string }> = (props) => (
  <ErrorMessage name={props.name}>
    {(msg) => (
      <div className="required-color" data-testid={`${props.name}-error`}>
        {titleCase(msg).replace(/_/g, " ")}
      </div>
    )}
  </ErrorMessage>
);

export type MyFieldProps = React.InputHTMLAttributes<any> & {
  // You can add more input types here
  as?: "radio" | "input" | "select" | "radio" | "checkbox" | "textarea";
  name: string;
  formData?: FormikProps<any>;
};

export const MyField = (props: MyFieldProps) => {
  const [input, meta] = useField<any>(props.name);

  return (
    <Field
      {...props}
      {...input}
      value={input.value ?? ""}
      className={classNames(props.className, {
        "border-red": meta.error && meta.touched,
      })}
      data-testid={props.name}
    />
  );
};

export const MyTextArea = (props: MyFieldProps) => {
  const [input, meta] = useField<any>(props.name);

  return (
    <textarea
      {...props}
      {...input}
      value={input.value ?? ""}
      className={classNames(props.className, {
        "border-red": meta.error && meta.touched,
      })}
    />
  );
};

interface TMySelectProps<T> extends React.SelectHTMLAttributes<any> {
  getValue: (option: T) => string;
  getName: (option: T) => string;
  options: T[];
  name: string;
  defaultName?: string;
}

export function MySelect<T>(props: TMySelectProps<T>) {
  const { getValue, getName, name, options, defaultName, ...restProps } = props;
  const [selectProps, meta, helpers] = useField<T>(name);

  return (
    <select
      {...restProps}
      {...selectProps}
      className={classNames(restProps.className, {
        "border-red": meta.error && meta.touched,
        empty: !meta.value,
      })}
      value={meta.value ? getValue(meta.value) : ""}
      onChange={(e) => {
        helpers.setTouched(true);
        helpers.setValue(
          options.find(
            (option) => `${getValue(option)}` === e.currentTarget.value
          )!
        );
        props.onChange?.(e);
      }}
    >
      <option disabled value="">
        {defaultName || restProps.placeholder || ""}
      </option>
      {options.map((option) => (
        <option key={getValue(option)} value={getValue(option)}>
          {getName(option)}
        </option>
      ))}
    </select>
  );
}

interface TRequirementInputProps extends React.InputHTMLAttributes<any> {
  name: string;
  mimeTypes: string[];
  getFileName: (file: File) => string;
  imageUrl: string;
}

export const MyFileInput = (props: TRequirementInputProps) => {
  const { mimeTypes } = props;
  const [input, meta, helpers] = useField<File>(props.name);
  const { formData } = useContext(FormContext);
  const [base64, setBase64] = useState("");
  const file = useFileUpload({
    mimeTypes,
  });

  useEffect(() => {
    if (!file.file && !formData.imageFile) return;

    // update formik input
    helpers.setValue(file.file ?? formData.imageFile!);

    // convert to base64 for display
    const reader = new FileReader();

    reader.addEventListener("load", async () => {
      const b64 = await readBase64(file.file! ?? formData.imageFile);

      setBase64(b64);
    });
    reader.readAsDataURL(file.file ?? formData.imageFile!);
  }, [file.file, formData.imageFile]);

  useEffect(() => {
    // update the base64 with image url, mainly during editing
    if (props.imageUrl) {
      setBase64(props.imageUrl);
    }
  }, [props.imageUrl]);

  return (
    <div
      className={classNames("file-input-wrapper", props.className, {
        "border-red": meta.error && meta.touched,
      })}
    >
      <input
        {...input}
        className="inputfile"
        accept=".jpg, .jpeg, .png"
        value=""
        type="file"
        id="file"
        onChange={file.onChange}
      />
      <label htmlFor="file">
        <div className="image">
          <img src={base64 || white} alt="select" />
          <div className="overlay">
            <CameraAltIcon className="icon" />
          </div>
        </div>
      </label>
    </div>
  );
};

interface TMySubmitButtonProps {
  content: string;
  isSubmitting?: boolean;
  type?: "button" | "submit";
}
export const MySubmitButton = (props: TMySubmitButtonProps) => {
  const formikContext = useFormikContext();

  return (
    <SubmitButton
      isLoading={formikContext.isSubmitting || !!props.isSubmitting}
      type={props.type || "submit"}
      content={props.content}
      data-testid={props.type || "submit"}
    />
  );
};
