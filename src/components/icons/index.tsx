import { FC } from "react";

type Props = {
  className?: string
};

export const Chevron: FC<Props> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
  >
    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
  </svg>
);

export const Location: FC<Props> = ({ className }) => (
  <svg
   className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
    </svg>
)

export const Time: FC<Props> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l-4 2"/>
  </svg>
);

export const Shirt: FC<Props> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"

    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
  </svg>
);

export const CloseMenu: FC<Props> = ({ className }) => (
  <svg  
  className={className}
  viewBox="0 0 24 24"
  fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon"
  aria-hidden="true"
  >
    <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Close: FC<Props> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth=""
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

export const Frown: FC<Props> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
    <line x1="9" x2="9.01" y1="9" y2="9"/>
    <line x1="15" x2="15.01" y1="9" y2="9"/>
  </svg>
);

export const ChevronDown: FC<Props> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
  >
    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
  </svg>
);

// className="size-6"
export const Tick: FC<Props> = ({ className }) => (
  <svg
  className={className}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 -960 960 960"
  fill="currentColor"
  data-slot="icon"
  aria-hidden="true" >
    <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/>
  </svg>
);

export const Hamburger: FC<Props> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    data-slot="icon"
    aria-hidden="true"
  >
    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Mail: FC<Props> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className={className}
  >
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
    <rect x="2" y="4" width="20" height="16" rx="2"/>
  </svg>
);

export const Sun: FC<Props> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className={className}
  >
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 3v1"/>
      <path d="M12 20v1"/><path d="M3 12h1"/>
      <path d="M20 12h1"/>
      <path d="m18.364 5.636-.707.707"/>
      <path d="m6.343 17.657-.707.707"/>
      <path d="m5.636 5.636.707.707"/>
      <path d="m17.657 17.657.707.707"/>
  </svg>
);

export const Moon: FC<Props> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className={className}
  >
    <path d="M18 5h4"/>
    <path d="M20 3v4"/>
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
  </svg>
);

// type Props = {
//   className?: string
// }

// const NoSound: FC<Props> = ({ className }) => (
//   <svg className={className} xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="currentColor" >
//     <path d="m616-320-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm-496-40v-240h160l200-200v640L280-360H120Zm280-246-86 86H200v80h114l86 86v-252ZM300-480Z"/>
//   </svg>
// )
