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
      dark ? "text-white hover:text-winter-lighter visited:text-white"
      : "text-gray-900 hover:text-winter-lighter visited:text-gray-900"
    )}
  >
    {chunk}
  </a>
);

export const common = {
  b: (chunks: Chunks) => <b>{chunks}</b>,
  i: ( chunks: Chunks ) => <i>{chunks}</i>,
  h: ( chunks: any ) => <span className="invisible">{chunks}</span>,
  mobile: (chunks: Chunks) => <p className="sm:inline">{chunks}</p>,
  strong: (chunks: Chunks) => <strong className="font-semibold text-gray-900">{chunks}</strong>,
};

export default contentLink;