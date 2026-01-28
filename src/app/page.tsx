import { SearchContextProvider } from "@/context/SearchContext";
import {
  Menu,
  Rsvp,
  Header,
  FAQ,
  Contact,
  Wip,
  About,
  Music
} from "../components/";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
const filters = (await searchParams);

  if(filters.dev !== '1'){
    return (<Wip />);
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Menu />
        <Header />
        <SearchContextProvider>
          <Rsvp />
        </SearchContextProvider>
        <About />
        <FAQ />
        <Music />
        <Contact />
      </main>
    )
  }
}
