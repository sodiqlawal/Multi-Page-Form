import { useField } from "formik";
import Cleave from "cleave.js/react";
import classNames from "classnames";

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
