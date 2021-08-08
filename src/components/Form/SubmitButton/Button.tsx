import React from "react";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";

interface TButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  content: string;
  isLoading?: boolean;
}
const Button = (props: TButtonProps) => {
  const { isLoading, content, ...restProps } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...restProps}
      disabled={!!isLoading}
      className={classNames("button", props.className, {
        isSubmitting: !!isLoading,
      })}
    >
      {props.isLoading ? (
        <CircularProgress size={15} thickness={6} color="inherit" />
      ) : (
        <span>{content}</span>
      )}
    </button>
  );
};

export default Button;
