'use client'

import { useNotificationContext } from "@/context/NotificationContext";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { FC } from "react";

const NotificationOverlay: FC = () => {
  const { notifications, closeNotification } = useNotificationContext();
  const t = useTranslations('notifications');

  return (
    <div className={classNames(
      "fixed inset-0 grid items-end justify-items-end z-50",
      "mx-2 mb-2 mt-auto",
      "gap-4 min-h-fit pointer-events-none",
      "md:mx-4 md:mb-4"
     )}
    >
      {notifications.length > 0 && notifications.map((notification) => 
        <div
          key={notification.id}
          className={classNames(
            'flex items-center w-full max-w-sm p-4 text-body',
            'border rounded shadow-lg pointer-events-auto',
            {
            'bg-red-100 border-red-800 text-red-800': notification.type === 'error',
            'bg-blue-50 border-gray-300 text-gray-900': notification.type === 'default',
          })}
          role="alert"
        >
          {notification.type === 'error' &&
            <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 rounded">
              <Fown className="size-8" />
            </div>
          }

          <div className="ms-3 text-sm  font-normal">{notification.message}</div>
          <button
            type="button"
            className={classNames({
              "ms-auto flex items-center justify-center rounded": true,
              "bg-transparent box-border border border-transparent": true,
              "focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none": true,
              'hover:bg-red-200': notification.type === 'error',
              'hover:bg-blue-200': notification.type === 'default',
            })}
            data-dismiss-target="#toast-danger"
            aria-label={t('close')}
            onClick={() => closeNotification(notification.id)}
          >
              <span className="sr-only">{t('close')}</span>
              <Close className="size-6" />
          </button>
        </div>
      )}
    </div>
  )
};

type Props = {
  className?: string
}

const Close: FC<Props> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const Fown: FC<Props> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
    <line x1="9" x2="9.01" y1="9" y2="9"/>
    <line x1="15" x2="15.01" y1="9" y2="9"/>
  </svg>
);

export default NotificationOverlay;
