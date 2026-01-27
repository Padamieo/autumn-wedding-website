'use client'

import { useSearchParams } from 'next/navigation'
import { completeSignIn } from "@/firebase/auth/signin";
import { signIn } from "@/firebase/auth/linkCustom";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components';

const storedAuthEmail = 'authEmail'

function Page() {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [storedEmail, setStoredEmail] = useState<string>();
 
  const apiKey = searchParams.get('apiKey');

  async function fetchMyAPI(storedEmail: string) {
    if (!apiKey || user) {
      return;
    }

    const { result, error } = await completeSignIn(
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
    console.log(result);
  }

  const back = () => {
    router.push("/");
  }

  const clear = () => {
    localStorage.removeItem(storedAuthEmail);
    setStoredEmail(undefined);
    router.push("/auth");
  }

  useEffect(() => {
    const localStorageEmail = localStorage.getItem(storedAuthEmail);

    if (localStorageEmail) {
      setStoredEmail(localStorageEmail);
      // apiKey && fetchMyAPI(localStorageEmail);
    }
  }, [apiKey])

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    
    // Attempt to sign in with provided email
    const { result, error } = await signIn(email);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    localStorage.setItem(storedAuthEmail, email);
    setStoredEmail(email);

    // Sign in successful
    console.log(result);
  }

  const Complete = (x:string, storedEmail:string) => (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Complete Process</h1>
      <div className="mb-6">
        <p>Please check your email: <b>{storedEmail}</b> account for a link, including spam folders.</p>
      </div>
      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded" onClick={() => fetchMyAPI(storedEmail)}>Complete Sign In</button>
    </div>
  );

  const loginBox = (x:string, storedEmail:string) => (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-6 text-black">{x}</h1>
      <div className="mb-6">
        <p>Please check your email: <b>{storedEmail}</b> account for a link, including spam folders as it most likley got blocked.</p>
      </div>
      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded" onClick={() => clear()}>That email address is wrong!</button>
    </div>
  );

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl font-bold mb-6 text-black">Already logged in!</h1>
            <div className="mb-6">
              <p>You probably logged in via another tab / window, you can still use this one.</p>
            </div>
            <Button onClick={() => back()}>Return to home page</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        {storedEmail ? apiKey ? Complete('', storedEmail) : loginBox('Email sent!', storedEmail) :
          <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl font-bold mb-6 text-black">Log In / Register</h1>
            <div className="mb-6">
              <p>To make things simple we setup a password-less log in and registration process.</p>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="name@mail.co.uk"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        }
      </div>
    </div>
  );
}

export default Page;
