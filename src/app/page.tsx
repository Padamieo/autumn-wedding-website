
import {
  Menu,
  Rsvp,
  Header,
  FAQ,
  Contact,
  Wip,
  About,
  Music,
  FoodAndDrink,
  Directions,
  Gift,
  // Countdown
} from "../components/";

const wip = process.env.NEXT_PUBLIC_WORK_IN_PROGRESS;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
const filters = (await searchParams);

  if(wip && filters.dev !== '1'){
    return (<Wip />);
  } else {
    return (
      <main className="flex flex-col">
        <Menu />
        <Header />
        <Rsvp />
        <About />
        {/* <Countdown /> */}
        <FAQ />
        <FoodAndDrink />
        <Gift />
        <Directions />
        <Music />
        <Contact />
      </main>
    )
  }
}
