'use client'

import { useSearchParams } from 'next/navigation'
import { completeSignIn } from "@/firebase/auth/link";
import { signIn } from "@/firebase/auth/linkCustom";
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from "react";
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components';
import { useNow, useTranslations } from 'next-intl';
import { authEmailArray } from '@/components/emails/auth';

const storedAuthEmail = 'authEmail'

type StoredEmail = {
  email: string;
  date: number;
}

function Page() {
  const t = useTranslations();
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [storedEmail, setStoredEmail] = useState<StoredEmail>();
  const [loading, setLoading] = useState<boolean | undefined>();
 
  const apiKey = searchParams.get('apiKey');

  async function fetchMyAPI(storedEmail: string) {
    if (!apiKey || user) {
      return;
    }

    const { error } = await completeSignIn(
      storedEmail,
      window.location.href
    );

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    // clear email stored
    localStorage.removeItem(storedAuthEmail);
    router.push("/");
  }

  const back = () => {
    router.push("/");
  }

  const reAuth = () => {
    router.push("/auth");
  }

  const clear = () => {
    localStorage.removeItem(storedAuthEmail);
    setStoredEmail(undefined);
    reAuth();
  }

  useEffect(() => {
    const localStorageEmail = localStorage.getItem(storedAuthEmail);

    // localStorage.setItem(storedAuthEmail, JSON.stringify({email: 'michaeladamlockwood@googlemail.com', date: new Date().valueOf()}));

    if (localStorageEmail) {
      setStoredEmail(JSON.parse(localStorageEmail));
      // apiKey && fetchMyAPI(localStorageEmail);
    }
  }, [apiKey])

  const buildEmailContent = (name?: string | undefined) => {
    return authEmailArray.reduce(
      (acc, e) => acc = {
        ...acc,
        [e]: e === 'dear' ? name ? t(`email.${e}`, { name }) : t('email.hello') : t(`email.${e}`)
      },
    { title: '', dear: '', please: '', link: '', signoff: '' });
  };

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    const emailContent = buildEmailContent(undefined);

    const { result, error } = await signIn(email, emailContent);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      setLoading(false);
      return;
    }

    // Sign-in successfully started
    const store = {email, date: new Date().valueOf()};
    localStorage.setItem(storedAuthEmail, JSON.stringify(store));
    setStoredEmail(store);
    console.log(result);
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-xs">

          <Wrapper>
            <h1 className="text-3xl font-bold mb-6 text-black">{t('auth.already.title')}</h1>
            <div className="mb-6">
              <p>{t('auth.already.body')}</p>
            </div>
            <Button className="w-full" onClick={() => back()}>{t('auth.already.button')}</Button>
          </Wrapper>

        </div>
      </div>
    );
  }

  const form = () => (
    <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-6 text-black">{t('auth.start.title')}</h1>
      <div className="mb-6">
        <p>{t('auth.start.body')}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          {t('auth.start.input.label')}
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
          placeholder={t('auth.start.input.placeholder')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? t('auth.start.input.loading') : t('auth.start.input.submit')}
        </Button>
      </div>
    </form>
  )

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        {storedEmail ? (
          apiKey ? <CompleteEmail email={storedEmail.email} complete={fetchMyAPI} /> : <SentEmail stored={storedEmail} clear={clear} />
        ) :
          apiKey ? <NotRecognized reAuth={reAuth} /> : form()
        }
      </div>
    </div>
  );
}

export interface Props {
  stored: StoredEmail;
  clear: () => void;
}

const timeOut = 60000 * 1;
const seconds = 1000;

const SentEmail: FC<Props> = ({ stored, clear }) => {
  const t = useTranslations();
  const [disabled, setDisabled] = useState<boolean>(true);

  const secondsRemaining = (time: number, timeNow: number) => {
    return Number(
      (((time + timeOut) - timeNow)  / seconds
    ).toFixed(0))
  }
  const sec = useRef<number>(secondsRemaining(stored.date, new Date().valueOf()));
  const checkInterval = useRef<number>(seconds * 1);

  let now = useNow({
    // check every second
    updateInterval: checkInterval.current,
  });

  useEffect(() => {
    if (now.valueOf() > stored.date + timeOut) {
      setDisabled(false);
      sec.current = 0;
      checkInterval.current = seconds * 60;
    } else {
      sec.current = secondsRemaining(stored.date, now.valueOf());
    }
    return;
  }, [now])
  
  return (
    <Wrapper>
      <h1 className="text-3xl font-bold mb-6 text-black">{t('auth.sent.title')}</h1>
      <div className="mb-6 wrap-break-word">
        <p>
          {t.rich('auth.sent.body', {
            email: stored.email, 
            b: (chunks) => <b>{chunks}</b>
          })}
        </p>
      </div>
      <Button className="w-full" disabled={disabled} onClick={() => clear()}>
        {t('auth.sent.button')}
      </Button>
      {disabled && <p className="text-sm mt-4 text-gray-500" >
        {t('auth.sent.wait', { time : sec.current})}
      </p>}
    </Wrapper>
  )
};

export interface Props2 {
  email: string;
  complete: ( email:string ) => void;
}

const CompleteEmail: FC<Props2> = ({ email, complete }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const call = () => {
    setLoading(true);
    complete(email);
  };

  return (
    <Wrapper>
      <h1 className="text-3xl font-bold mb-6 text-black">{t('auth.complete.title')}</h1>
      <div className="mb-6">
        <p>{t.rich('auth.complete.body', {
          email, 
          b: (chunks) => <b>{chunks}</b>
        })}</p>
      </div>
      <Button className="w-full" disabled={loading} onClick={call}>
        {t('auth.complete.button')}
      </Button>
    </Wrapper>
  );
};

export interface Props3 {
  reAuth: () => void;
}

const NotRecognized: FC<Props3> = ({ reAuth }) => {
  const t = useTranslations();

  return (
    <Wrapper>
      <h1 className="text-3xl font-bold mb-6 text-black">{t('auth.notRecognized.title')}</h1>
      <div className="mb-6">
        <p>{t('auth.notRecognized.body')}</p>
      </div>
      <Button className="w-full" onClick={reAuth}>{t('auth.notRecognized.button')}</Button>
    </Wrapper>
  )
};

export interface Props4 {
  children: React.ReactNode;
}

const Wrapper: FC<Props4> = ({ children }) => (
  // border border-gray-300
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 wrap-break-word ">
    {children}
  </div>
);

export default Page;
