/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Field,
  ErrorMessage,
  FormikProps,
  useField,
  useFormikContext,
} from "formik";
import Cleave from "cleave.js/react";
import classNames from "classnames";
import "./Form.scss";
import capitalizeFirstLetter from "../../lib/utils/titleCase";
import useFileUpload from "../../hooks/useFileUpload";
import SubmitButton from "./SubmitButton/Button";

export const MyErrorMessage: React.FC<{ name: string }> = (props) => (
  <ErrorMessage name={props.name}>
    {(msg) => (
      <div className="required-color">
        {capitalizeFirstLetter(msg).replace(/_/g, " ")}
      </div>
    )}
  </ErrorMessage>
);

type MyFieldProps = React.InputHTMLAttributes<any> & {
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

interface TMyCurrencyInputProps extends React.InputHTMLAttributes<any> {
  name: string;
  prefix?: string;
}

export const MyCurrencyInput = (props: TMyCurrencyInputProps) => {
  const [input, meta, helpers] = useField<number>(props.name);

  return (
    <Cleave
      {...props}
      {...input}
      className={classNames(props.className, {
        "border-red": meta.error && meta.touched,
      })}
      options={{
        numeral: true,
        numeralThousandsGroupStyle: "thousand",
        prefix: props.prefix === undefined ? "₦ " : props.prefix,
        noImmediatePrefix: true,
        rawValueTrimPrefix: true,
      }}
      onChange={(e) => helpers.setValue(Number(e.target.rawValue))}
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
}

export const MyFileInput = (props: TRequirementInputProps) => {
  const { mimeTypes, ...restProps } = props;
  const [input, meta, helpers] = useField<File>(props.name);
  const file = useFileUpload({
    mimeTypes,
  });

  useEffect(() => {
    if (!file.file) return;
    helpers.setValue(file.file);
  }, [file.file]);

  return (
    <div
      className={classNames("file-input-wrapper", props.className, {
        "border-red": meta.error && meta.touched,
      })}
    >
      <label>
        <input {...input} value="" type="file" onChange={file.onChange} />
      </label>
      {!meta.value && <span>{restProps.placeholder}</span>}
      <span>{meta.value && props.getFileName(meta.value)}</span>
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
    />
  );
};
