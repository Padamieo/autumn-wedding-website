'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react';
import { useAuthContext } from '@/context/AuthContext';
import {
  // Translation,
  Button
} from '..';
import { useTranslations } from 'next-intl';
import signOut from "@/firebase/auth/signout";
import { useRouter } from 'next/navigation';
import { useSearchContext } from '@/context/SearchContext';
import { useNotificationContext } from '@/context/NotificationContext';
import classNames from 'classnames';
import Image from 'next/image';
import { CloseMenu, Hamburger, Tick } from '../icons';
// import { useConfettiContext } from "@/context/ConfettiContext";

export default function Menu() {
  // const { setConfetti } = useConfettiContext();
  const { user } = useAuthContext() as { user: any };
  const t = useTranslations();
  const router = useRouter();
  const { submittedCode, clearUser } = useSearchContext();
  const { createError } = useNotificationContext();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: t('menu.details'), href: '#details' },
     { name: t('menu.rsvp'), href: '#guestList', checked: submittedCode },
    { name: t('menu.faq'), href: '#faq', mobile: true },
    { name: t('menu.directions'), href: '#directions' },
    { name: t('menu.food'), href: '#food', mobile: true },
    { name: t('menu.gift'), href: '#gift', mobile: true },
    { name: t('menu.music'), href: '#music' },
    { name: t('menu.contact'), href: '#contact', mobile: true },
  ]

  const handleSignOut = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { error } = await signOut();

    if (error) {
      console.log(error);
      createError();
      return;
    }
    // Succesful sign out
    clearUser();
  }

  const goToAuth = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    router.push("/auth");
  }

  const rightMenu = (user: boolean) => {
    return (
      <>
        <Button
          onClick={user ? handleSignOut : goToAuth}
        >
          {user ? t('auth.logout') : t('auth.login')}
        </Button>
        {/* <Translation /> */}
      </>
    );
  };

  const siteLogo = () => {
    return (
      <a
        href="#" className="-m-1.5 p-1.5 h-2 flex items-center"
        //onClick={() => setConfetti(true)}
      >
        <span className="sr-only">Pumpkin Logo</span>
        <Image
          className={classNames(
            "",
          )}
          src="/pumpkin.svg"
          alt="pretty watercolor wreath of flowers"
          width={60}
          height={60}
          priority
        />
      </a>
    );
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          {siteLogo()}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-ivory/80 backdrop-blur-xs"
          >
            <span className="sr-only">{t('menu.openMenu')}</span>
            <Hamburger className='size-6'/>
          </button>

        </div>
        <div className="hidden lg:flex lg:gap-x-12 lg:bg-ivory/80 backdrop-blur-xs px-8 py-2">
          {navigation.map((item) => ( !item.mobile &&
            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 flex items-center">
              {item.name}{item.checked && <Tick />}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2">
          {rightMenu(!!user)}
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel
          className={classNames(
            "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          )}
        >
          <div className="flex items-center justify-between">
            {siteLogo()}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">{t('menu.closeMenu')}</span>
              <CloseMenu className='size-6'/>
            </button>
          </div>
          <div className="mt-10 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={classNames(
                      "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 flex items-center"
                    )}
                  >
                    {item.name}{item.checked && <Tick className='size-6' />}
                  </a>
                ))}
              </div>
              <div className="flex py-6 gap-x-6 py-6">
                {rightMenu(!!user)}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}