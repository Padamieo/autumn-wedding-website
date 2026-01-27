'use client'

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
        //className="w-full bg-winter-green text-white font-semibold py-2 rounded hover:bg-indigo-500"
        className="rounded-md bg-winter-green px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        {...ownProps}
      >
        {children as ReactNode}
      </button>
    );

    // return createElement(
    //   isLink ? 'a' : 'button',
    //   { ...ownProps, className: 'rounded-md bg-winter-green px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' },
    //   children as ReactNode,
    // );
  };

  export default Button;