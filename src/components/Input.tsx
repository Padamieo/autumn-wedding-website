'use client'

import classNames from 'classnames';
import { FC } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const defaultInputText = "block w-full rounded bg-white text-base text-gray-900";
export const commonOutline = "outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400";
export const commonFocus =  "focus:outline-2 focus:-outline-offset-2 focus:outline-winter-lighter";

const Input: FC<InputProps> = ({
  className,
  ...ownProps
}) => {
  return (
    <input
      className={classNames(
        defaultInputText,
        "py-2 px-3",
        commonOutline,
        commonFocus,
        // "sm:text-sm/6",
        className,
      )}
      {...ownProps}
    />
  );
};

export default Input;