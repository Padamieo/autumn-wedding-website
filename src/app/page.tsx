
import {
  Menu,
  Rsvp,
  Header,
  FAQ,
  Contact,
  Wip,
  About,
  Music,
  FoodAndDrink
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
      <main className="flex flex-col">
        <Menu />
        <Header />
        <Rsvp />
        <About />
        <FAQ />
        <FoodAndDrink />
        <Music />
        <Contact />
      </main>
    )
  }
}
