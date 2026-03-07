'use client'

import classNames from "classnames";
import { FC } from "react";

export interface Props {
  name: string,
  id: string,
  label: string,
  description?: string,
  checked?: boolean,
}

export const RadioOption: FC<Props> = ({
  name, id, label, description
}) => {
  return (
    <label className="flex items-center gap-x-3  pl-1 sm:pl-3" htmlFor={`${name}-${id}`} >
      <input
        required
        // defaultChecked={checked}
        id={`${name}-${id}`}
        name={name}
        type="radio"
        value={id}
        className={classNames(
          "relative size-6 shrink-0 appearance-none",
          "rounded-full border border-gray-300 hover:bg-winter-lighter",
          "bg-white before:absolute before:inset-1 before:rounded-full",
          "before:bg-white not-checked:before:hidden checked:border-winter-green",
          "checked:bg-winter-green",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-winter-lighter",
          "disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
        )}
      />
      <div className="text-sm/6" >
        <p className="font-medium text-gray-900">
          {label}
        </p>
        {description && (
          <p id={`${id}-attending-description`} className="text-gray-500">
            {description}
          </p>
        )}
      </div>
    </label>
  );
};