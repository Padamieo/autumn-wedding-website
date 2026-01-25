'use client'

import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { default as signIn, completeSignIn } from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuthContext } from '@/context/AuthContext';

function useGetAllSearchParams(searchParams: ReadonlyURLSearchParams) {
  const params: { [anyProp: string]: string } = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

export const buildQueryString = (obj: any) => {
  const queryString = Object.keys(obj)
  .filter((key) => obj[key] !== "" && obj[key] !== undefined && obj[key] !== null)
  .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  .join("&");

  return queryString;
};

function Page() {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = useGetAllSearchParams(searchParams)

  const [email, setEmail] = useState('');
  const [storedEmail, setStoredEmail] = useState<string>();
 
  const apiKey = searchParams.get('apiKey');

  async function fetchMyAPI(storedEmail: string) {
    if (!apiKey || user) {
      return;
    }
    console.log(      storedEmail,
      buildQueryString(pathname), window.location.href)

    const { result, error } = await completeSignIn(
      storedEmail,
      buildQueryString(pathname)
    );

    if (error) {
    // Display and log any sign-in errors
    console.log(error);
    return;
    }

    // clear email stored
    router.push("/");
    console.log(result);
  }

  useEffect(() => {
    const localStorageEmail = localStorage.getItem('email');
    
    if (localStorageEmail) {
      setStoredEmail(localStorageEmail);
      apiKey && fetchMyAPI(localStorageEmail);
    }
  }, [apiKey])

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(email);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    localStorage.setItem('email', email);
    setStoredEmail(email);

    // Sign in successful
    console.log(result);
  }

  const loginBox = (x:string, storedEmail:string) => (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-6 text-black">{x}</h1>
      <div className="mb-6">
        <p>Please check your email: <b>{storedEmail}</b> account for a link, including spam folders.</p>
      </div>
      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded">That email address is wrong!</button>
    </div>
  );

  const alreadyAuth = () => (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Already signed in!</h1>
      <div className="mb-6">
        <p>I honestly don't know how you ended up here.</p>
      </div>
      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded">Return to main site</button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        {user ? alreadyAuth() : storedEmail ? loginBox('Email sent!', storedEmail) :
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
