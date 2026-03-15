
export type MinimalGuestData = Response & {
  id: number;
  code: string;
  first: string;
  surname: string;
  alt: string;
  stay: number;
  participation: number;
  relationships: number[];
}

export type ExpectedResponses = "not" | "day" | "weekend" | 'yes' | 'no';

export const responseOptions = {
  weekend: "weekend",
  day: "day",
  not: "not",
  yes: "yes",
  no: "no",
};

type Response = {
  user: string | undefined;
  replied: ExpectedResponses | "";
};

export type GuestUpdate = Response & {
  dietary: string;
  opt: boolean,
  date: string,
  paid: boolean;
};

export type GuestUpdatePayload = { [id:string]: GuestUpdate };

export type GuestData = MinimalGuestData & GuestUpdate;