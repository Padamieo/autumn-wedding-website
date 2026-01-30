'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react';
import { useAuthContext } from '@/context/AuthContext';
import { Translation, Button } from '..';
import { useTranslations } from 'next-intl';
import signOut from "@/firebase/auth/signout";
import { useRouter } from 'next/navigation';
import { useSearchContext } from '@/context/SearchContext';

export default function Menu() {
  const { user } = useAuthContext() as { user: any };
  const t = useTranslations();
  const router = useRouter();
  const { submittedCode } = useSearchContext();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: t('menu.details'), href: '#details' },
    { name: t('menu.faq'), href: '#faq', mobile: true },
    { name: t('menu.rsvp'), href: '#guestList', checked: submittedCode },
    { name: t('menu.music'), href: '#music' },
    { name: t('menu.contact'), href: '#contact' },
  ]

  const handleSignOut = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Attempt to sign out
    const { result, error } = await signOut();

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    // Sign in successful
    console.log(result);
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
        <Translation />
      </>
    );
  };

  const siteLogo = () => {
    return (
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#1f1f1f"><path d="M40-120v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-160q-43 0-84-13.5T320-212v92H40Zm120-280q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-520q0 50-34.5 85T160-400Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-520q0 50-34.5 85T800-400Zm-320-80q-68-62-111-104.5T302-658q-24-31-33-54.5t-9-47.5q0-50 35-85t86-35q28 0 54 12.5t45 33.5q19-21 45-33.5t54-12.5q51 0 86 35t35 85q0 24-9 47.5T658-658q-24 31-67 73.5T480-480Zm0-108q72-66 106-107.5t34-64.5q0-17-12-28.5T579-800q-12 0-23.5 7T532-772l-51 59-51-57q-14-16-25.5-23t-23.5-7q-17 0-29 11.5T340-760q0 23 34 64.5T480-588Zm0 0Z"/></svg>
      </a>
    );
  };

  const tick = () =>  (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
      <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/>
    </svg>
  );

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
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">{t('menu.openMenu')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              !item.mobile && <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 flex items-center">
                {item.name}{item.checked && tick()}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2">
            {rightMenu(!!user)}
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              {siteLogo()}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">{t('menu.closeMenu')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      // onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 flex items-center"
                    >
                      {item.name}{item.checked && tick()}
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