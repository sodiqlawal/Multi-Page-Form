/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Field,
  ErrorMessage,
  FormikProps,
  useField,
  useFormikContext,
  FormikConfig,
  FormikValues,
  Formik,
} from "formik";
import classNames from "classnames";
import "./Form.scss";
import capitalizeFirstLetter from "../../lib/utils/titleCase";
import useFileUpload from "../../hooks/useFileUpload";
import { TFormPageController } from "../../hooks/useFormPageController";
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

export function MySelect2<T>(props: TMySelectProps<T>) {
  const { getValue, getName, name, options, defaultName, ...restProps } = props;
  const [, , helpers] = useField<string>(name);

  return (
    <MyField
      name={name}
      {...restProps}
      as="select"
      // value={meta.value ? getValue(meta.value) : ''}
      onChange={(e) => {
        helpers.setTouched(true);
        helpers.setValue(e.currentTarget.value);
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
    </MyField>
  );
}

// I'm not sure if errors are memoized by default
const defaultShouldTriggerErrors = (errors: object, nextErrors: object) =>
  errors !== nextErrors;

export const FormErrorListener = (props: {
  shouldTriggerErrors?: Function;
  onError: Function;
}) => {
  const shouldTriggerErrors =
    props.shouldTriggerErrors || defaultShouldTriggerErrors;
  const formik = useFormikContext();
  const [errors, updateErrors] = React.useState(formik.errors);

  React.useEffect(() => {
    if (shouldTriggerErrors(errors, formik.errors)) {
      props.onError(formik.errors);

      updateErrors(errors);
    }
  }, [formik.errors]);

  return null;
};

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
      className={classNames("fileInputWrapper", props.className, {
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

interface TFormNavigationButtonsProps<T> {
  pageController: TFormPageController<T>;
  getPageName: (id: T) => string;
  excludePages?: T[];
}

export const FormNavigationButtons = <T extends string>(
  props: TFormNavigationButtonsProps<T>
) => {
  return (
    <div className="navButtonWrapper">
      {props.pageController.pages.map(
        (page, index: number) =>
          !props.excludePages?.includes(page.id) && (
            <div
              key={page.id}
              className={classNames("formProgressIndicator", {
                active: page.isActive,
                done: index < props.pageController.activePage.index,
              })}
            >
              <div className="left">
                <button
                  type="button"
                  onClick={async () => {
                    if (props.pageController.activePage.id === page.id) return;

                    await props.pageController.activePage.formController.current?.submitForm();

                    if (
                      !props.pageController.activePage.formController.current ||
                      props.pageController.activePage.formController.current
                        ?.isValid
                    ) {
                      props.pageController.goToPage(page.id);
                    }
                  }}
                >
                  {index + 1}
                </button>
                <div />
              </div>
              <div className="right">
                <p>{props.getPageName(page.id)}</p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

interface TFormikPageProps<T extends FormikValues, P extends string>
  extends FormikConfig<T> {
  pageController: TFormPageController<P>;
  pageId: P;
  children: (props: FormikProps<T>) => React.ReactNode;
}

export function FormikPage<T extends FormikValues, P extends string>(
  props: TFormikPageProps<T, P>
) {
  const { children, pageController, pageId, ...formik } = props;

  return (
    <Formik<T> {...formik}>
      {(formikProps) => {
        pageController.getPage(pageId).formController.current = formikProps;
        if (pageController?.activePage.id !== pageId) return null;
        return children(formikProps);
      }}
    </Formik>
  );
}

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
