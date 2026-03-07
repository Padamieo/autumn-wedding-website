'use client'

import classNames from 'classnames';
import {  HTMLAttributeAnchorTarget, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react'

export type Chunks = string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;

type Props = { chunk: Chunks, href: string, target?: HTMLAttributeAnchorTarget, dark?: boolean };

export const contentLink = ({chunk, href, target, dark }: Props ) => (
  <a
    href={href}
    target={target || "_self"}
    className={classNames(
      "underline",
      dark ? "text-white hover:text-sky-400 visited:text-white"
      : "text-gray-900 hover:text-sky-600 visited:text-gray-900"
    )}
  >
    {chunk}
  </a>
);

export default contentLink;