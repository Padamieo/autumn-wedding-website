'use client'

import {  HTMLAttributeAnchorTarget, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react'

export type Chunks = string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;

export const contentLink = (chunks: Chunks, href: string, target?: HTMLAttributeAnchorTarget ) => (
  <a
    href={href}
    target={target || "_blank"}
    className="underline text-gray-900 hover:text-blue-800 visited:text-gray-900">
    {chunks}
  </a>
);

  export default contentLink;