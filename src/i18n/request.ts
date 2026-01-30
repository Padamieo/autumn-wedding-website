import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from "next/headers";
 
export default getRequestConfig(async () => {
  const acceptLanguageArray = (await headers()).get("accept-language")?.split(",");
  const defaultLocale = acceptLanguageArray && acceptLanguageArray[0];
  const languaged = ['en']; //, 'nl', 'es', 'ca'];

  const locale2 = (await cookies()).get("NEXT_LOCALE")?.value || defaultLocale || "en";

  let locale = 'en';

  // console.log(locale3.replace(/[-_][a-z]+$/i, ""));

  // TODO: check for en-GB en-US fallbacks to en
  if (languaged.includes(locale2)) {
    // console.log(locale2);
    locale = locale2;
  } else {
    // TODO define fallbacks, of other accept language arrays
  }
 
  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  };
});