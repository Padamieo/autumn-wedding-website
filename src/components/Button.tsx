'use client'

import classNames from 'classnames';
import { FC, JSX, ReactNode } from 'react'

export type ChildrenWithString = string | Array<JSX.Element | string>;
export type ChildrenWithoutString = JSX.Element | JSX.Element[] | undefined;

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & (
  | {
      isLink?: false | never;
      noColour?: boolean;
      children: ChildrenWithString;
      ['aria-label']?: string;
    }
  | {
      isLink?: never;
      noColour?: boolean;
      children?: ChildrenWithoutString;
      ['aria-label']: string;
    }
);

export const ButtonFocus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-winter-lighter';
export const ButtonHover = 'hover:bg-winter-lighter';

const Button: FC<ButtonProps> = ({
  className,
  children,
  isLink,
  noColour,
  ...ownProps
}) => {
    return (
      <button
        className={classNames(
          'px-3 py-2 rounded text-sm font-semibold',
          ButtonFocus,
          'disabled:bg-gray-400',
          noColour ? '' : ButtonHover,
          noColour ? '' : 'bg-winter-green text-white',
          className
        )}
        {...ownProps}
      >
        {children as ReactNode}
      </button>
    );
  };

  export default Button;