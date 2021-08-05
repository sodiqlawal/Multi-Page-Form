import React from 'react';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

interface TSubmitButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  content: string;
  isLoading?: boolean;
}
const SubmitButton = (props: TSubmitButtonProps) => {
  const { isLoading, content, ...restProps } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...restProps}
      disabled={!!isLoading}
      className={classNames('submit', props.className, {
        isSubmitting: !!isLoading,
      })}
    >
      <CircularProgress size={15} thickness={6} color="inherit" />
      <span>{content}</span>
    </button>
  );
};

export default SubmitButton;
