'use client'

import classNames from 'classnames';
import { FC, JSX, ReactNode } from 'react'

export type ChildrenWithString = string | Array<JSX.Element | string>;
export type ChildrenWithoutString = JSX.Element | JSX.Element[] | undefined;

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  (
    | {
        isLink?: false | never;
        children: ChildrenWithString;
        ['aria-label']?: string;
      }
    | {
        isLink?: never;
        children?: ChildrenWithoutString;
        ['aria-label']: string;
      }
  );

const Button: FC<ButtonProps> = ({
  className,
  children,
  isLink,
  ...ownProps
}) => {
    return (
      <button
        className={classNames(
          'px-3 py-2 rounded bg-winter-green text-white font-semibold hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:bg-gray-400',
          className
        )}
        {...ownProps}
      >
        {children as ReactNode}
      </button>
    );
  };

  export default Button;